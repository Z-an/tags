import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    minWidth: 100,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 230,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 230,
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 10,
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  },
});

function SplashBase (props) {

  const { classes } = props;
  console.log(props.merchant)
  return (
    <div className={classes.root}>
        <ButtonBase
          focusRipple
          key={props.merchant.name}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: '33%',
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${props.merchant.url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
          </span>
        </ButtonBase>
      ))}
    </div>
  );
}

SplashBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SplashBase);
