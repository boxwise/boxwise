# Utilize travis stages, jobs and cache to optimize build time

* Status: Temporarily closed till builds with current config take too much time <!-- optional -->
* Deciders: @DurkoMatko, @jamescrowley <!-- optional -->
* Date: 2019-05-19 <!-- optional -->

# Table of Contents
1. [Context and Problem Statement](#Context-and-Problem-Statement)
2. [Considered Options](#considered-options)
3. [Parallel jobs (benchmark)](#Parallel-jobs-(benchmark))
    1. [Without cache](#Testing-and-benchmarking-parallel-jobs-without-cache)
    1. [With cache](#subparagraph1)
    1. [Other tested options](#Other-tested-options-to-speed-up-build-while-using-cache)
    1. [Advantages](#Advantages-of-using-parallel-jobs-for-us)
    1. [Disadvantages](#Disadvantages-of-using-parallel-jobs-for-us)
4. [Decision](#Decision)
5. [Ideal scenario we didn't achieve](#Ideal-scenario-we-didn't-achieve)


## Context and Problem Statement

We're using TravisCI for continuous integration and we would ideally want to run UI tests during build on every PR. Build currently executes following steps sequentially:

* install dependencies and node_packages using `yarn` command
* unit tests (Group A)
* circular dependencies check (Group A)
* linter (Group A)
* spin up local server and execute UI tests with cypress against it (Group B)
* build with `yarn build` (Group C)

Sequential execution of all these steps is too long to run on every PR because they all run against the same DB and this could cause unexpected race conditions in DB state.

Considering size of the dev team at the moment(4 people) and low frequency of incoming PRs, if we could dramatically decrease build time the risk of running two concurrent builds would be acceptable for now.

## Considered Options


* Travis stages - this is basically same as sequential execution when it comes to time. Stages ALWAYS execute sequentially. Positive is that using <i>fail_fast</i> parameter, if one stage fails the whole build fails immediately. Also, using TravisCI UI, every stage can be retriggered manually.
* Travis jobs - our OSS plan allowes us to run max 3 jobs parallel
* Utilizing travis cache with any of the above two options

## Parallel jobs (benchmark)
### Testing and benchmarking parallel jobs without cache

1. 3 jobs in parallel (Group A, B, C) - cca 20% time save compared sequential. Every job runs its own `yarn` and deploy step tries to upload artifacts from all jobs (which is not right)

```
env:
- TEST_SUITE="travis-job-unit-tests.sh"
- TEST_SUITE="travis-job-ui-tests.sh"
- TEST_SUITE="travis-job-build.sh"
script: ./${TEST_SUITE}
```

2. Splitting the longest job (cypress ui tests) into one job per .js test suite (Group A, B1, B2, B3 ,B4 , C) - took much more time than sequential because every job runs it's own `yarn`. As we're limited to only 3 jobs running at the same time, this chains several `yarn` commands to be executed after each other.

```
env:
- TEST_SUITE="travis-job-unit-tests.sh"
- TEST_SUITE="travis-job-ui-tests-products.sh"
- TEST_SUITE="travis-job-ui-tests-boxes.sh"
- TEST_SUITE="travis-job-ui-tests-signup.sh"
- TEST_SUITE="travis-job-ui-tests-controls.sh"
- TEST_SUITE="travis-job-build.sh"
script: ./${TEST_SUITE}
```

### Testing and benchmarking parallel jobs with cache
**Cache is stored per job!!** List of our latest caches for particular PRs can be seen <a href="https://travis-ci.com/boxwise/boxwise/caches">Here</a>. Caching idea was abandoned as loading dependencies from cache and installing them with `yarn` took the same time (49 vs 51 seconds). Cache config in `travis.yml` we've used was following:

```
cache: 
  yarn: true
  directories:
    - node_modules
    - ~/.cache    #this one caches Cypress binary
```

Having more than 3 parallel jobs (Group A, B1, B2, B3 ,B4 , C) caused the same issue as before. Bottleneck before was running `yarn` repeatedly, now it's loading cache repeatedly.

Possible reasons why caching wasn't effective in our case can be find in <a href="https://docs.travis-ci.com/user/caching/#things-not-to-cache">travis docs</a>.

### Other tested options to speed-up build while using cache

* Running UI tests against staging/production instead of local server (didn't help)
* Running UI tests without recording and uploading them to our <a href="https://dashboard.cypress.io/#/projects/e6jvz9/runs">Cypress Dashboard</a> (didn't help)

### Advantages of using parallel jobs for us

* Rerun only particular job fast if needed. This is useful espacially while our Cypress tests are still flaky

### Disadvantages of using parallel jobs for us
* When having more than 3 jobs, first build is muuuch slower as `yarn` or loading cache is executed by each job.
* No fail_fast option (which is possible with stages). After one job fails, other continue to run. This is known <a href="https://github.com/travis-ci/travis-ci/issues/2062">feature request</a> which is open for years.

## Decision
Considering all above described scenarios, we've decided to go with 3 parallel jobs(Group A, B, C). It's the only scenario which saves time already on first build. It also offers option to rerun browser tests (altho it means rerunning all of them). There's still the issue with deploy step trying to upload artifacts of every job which needs to be solved.

## Ideal scenario we didn't achieve
What we initially hoped for was running `yarn` and caching it 1st stage. 2nd stage would be maany parallel jobs which would find output of `yarn` from step before and they'd just do their tiny job real quick. After all these tiny parallel jobs (mostly UI tests) finish, 3rd build stage would happen. On rerunning build manually or by new incomming commit, 1st stage loads dependencies from cache and saves even more time.