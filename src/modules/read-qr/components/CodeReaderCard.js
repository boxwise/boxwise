import React, { PureComponent, createRef } from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import { Scanner, Cameras } from "react-instascan";
import Typography from "@material-ui/core/Typography";
import { object } from "prop-types";
import classNames from "classnames";
import beep from "commons/assets/audio/beep.mp3";
import AddBoxDialog from "containers/components/AddBoxDialog";

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
      const { classes, qrcode, onScan, toggleBoxDialog } = this.props;
      const { box, current, showAddBox } = qrcode;

      return (
        <Grid className={classes.media} container alignItems="center">
          <AddBoxDialog
            qrcode={current}
            open={showAddBox}
            onClose={() => toggleBoxDialog(false)}
          />
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
            {box ? (
              <CardContent>
                <Typography>Id: {box.humanID}</Typography>
                <Typography>Quantity: {box.quantity}</Typography>
                <Typography>Comment: {box.comment}</Typography>
              </CardContent>
            ) : null}
          </Card>
        </Grid>
      );
    }
  }
);
