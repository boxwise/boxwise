[1m────────────────────────────────────────────────────────────────────────────────────────────────
[1mmodified: src/components/AppFrame.js
[1m────────────────────────────────────────────────────────────────────────────────────────────────
[36m@ AppFrame.js:11 @[1m[38;5;146m import Button from '@material-ui/core/Button';[0m
import IconButton from "@material-ui/core/IconButton";[m
import SearchIcon from '@material-ui/icons/Search';[m
import MenuIcon from "@material-ui/icons/Menu";[m
[31mimport MenuItem from '@material-ui/core/MenuItem';[m
import Menu from '@material-ui/core/Menu';[m
import AppDrawer from "./AppDrawer";[m
[31mimport Product[7mButton from "../components/ProductButton[27m";[m
[32m[m[32mimport Product[7mCategoryGridItem from "./ProductCategoryGridItem[27m";[m
import Grid from '@material-ui/core/Grid';[m
import { drawerTheme } from "../theme";[m
[m
[36m@ AppFrame.js:199 @[1m[38;5;146m class AppFrame extends React.Component {[0m
                <div className={classes.popupTitle}>Choose a category</div>[m
                <div className={classes.productRoot}>[m
                  <Grid container>[m
[31m                    <Grid item xs={4}>[m
[31m                      <MenuItem className={classes.productItem}>[m
[31m                        <ProductButton icon="" label="Man" />[m
[31m                      </MenuItem>[m
[31m                    </Grid>[m
[31m                    <Grid item xs={4}>[m
[31m                      <MenuItem className={classes.productItem}>[m
[31m                        <ProductButton icon="" label="Woman" />[m
[31m                      </MenuItem>  [m
[31m                    </Grid>[m
[31m                    <Grid item xs={4}>[m
[31m                      <MenuItem className={classes.productItem}>[m
[31m                        <ProductButton icon="" label="Adult" />[m
[31m                      </MenuItem>  [m
[31m                    </Grid>[m
[31m                    <Grid item xs={4}>  [m
[31m                      <MenuItem className={classes.productItem}>[m
[31m                        <ProductButton icon="" label="Boy" />[m
[31m                      </MenuItem>  [m
[31m                    </Grid>[m
[31m                    <Grid item xs={4}>  [m
[31m                      <MenuItem className={classes.productItem}>[m
[31m                        <ProductButton icon="" label="Girl" />[m
[31m                      </MenuItem>  [m
[31m                    </Grid>[m
[31m                    <Grid item xs={4}>  [m
[31m                      <MenuItem className={classes.productItem}>[m
[31m                        <ProductButton icon="" label="Child" />[m
[31m                      </MenuItem>[m
[31m                    </Grid>[m
[31m                    <Grid item xs={4}>  [m
[31m                      <MenuItem className={classes.productItem}>[m
[31m                        <ProductButton icon="" label="Baby" />[m
[31m                      </MenuItem>[m
[31m                    </Grid>[m
[31m                    <Grid item xs={4}>  [m
[31m                      <MenuItem className={classes.productItem}>[m
[31m                        <ProductButton icon="" label="Food" />[m
[31m                      </MenuItem>[m
[31m                    </Grid>[m
[31m                    <Grid item xs={4}>  [m
[31m                      <MenuItem className={classes.productItem}>[m
[31m                        <ProductButton icon="" label="Hygiene" />[m
[31m                      </MenuItem>[m
[31m                    </Grid>[m
[32m[m[32m                    <ProductCategoryGridItem icon="" label="Man" />[m
[32m[m[32m                    <ProductCategoryGridItem icon="" label="Woman" />[m
[32m[m[32m                    <ProductCategoryGridItem icon="" label="Adult" />[m
[32m[m[32m                    <ProductCategoryGridItem icon="" label="Boy" />[m
[32m[m[32m                    <ProductCategoryGridItem icon="" label="Girl" />[m
[32m[m[32m                    <ProductCategoryGridItem icon="" label="Child" />[m
[32m[m[32m                    <ProductCategoryGridItem icon="" label="Baby" />[m
[32m[m[32m                    <ProductCategoryGridItem icon="" label="Food" />[m
[32m[m[32m                    <ProductCategoryGridItem icon="" label="Hygiene" />[m
                  </Grid>    [m
                </div>  [m
              </Menu>[m
