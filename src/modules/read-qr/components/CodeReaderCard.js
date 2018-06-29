import React, { PureComponent, createRef } from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import { Scanner, Cameras } from "react-instascan";
import { Typography } from "@material-ui/core";
import { object } from "prop-types";
import classNames from "classnames";
import beep from "commons/assets/audio/beep.mp3";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    padding: 2
  },
  video: {
    width: "100%",
    height: "100%"
  },
  backCamera: {
    transform: "scaleX(1) !important"
  }
};

export default withStyles(styles)(
  class CodeReaderCard extends PureComponent {
    static propTypes = {
      classes: object.isRequired
    };

    _beep = createRef();

    render() {
      const { classes, qrcode, onScan } = this.props;

      return (
        <Grid className={classes.media} container alignItems="center">
          <Card className={classes.card}>
            <Cameras>
              {([front, back]) => (
                <Scanner
                  camera={back || front}
                  onScan={code => {
                    onScan(code);
                    this._beep.current.play();
                  }}
                >
                  <video
                    className={classNames(classes.video, {
                      [classes.backCamera]: !!back
                    })}
                  />
                </Scanner>
              )}
            </Cameras>
            <audio src={beep} ref={this._beep} />
            <CardContent>
              <Typography>{qrcode.current}</Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    }
  }
);
