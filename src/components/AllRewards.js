import React, { Component, useState, useEffect } from "react";
import Color from 'color';
import GoogleFont from 'react-google-font-loader';
import { makeStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from "axios";

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
}));

const useStyles = makeStyles(( theme ) => ({
  actionArea: {
    borderRadius: 16,
    // flexBasis: 23,
    display: 'flex',
    // flexBasis: '33.333%',
    width: 256,
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  card: ({ color }) => ({
    minWidth: 256,
    borderRadius: 16,
    // flexBasis: '33.333%',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  content: ({ color }) => {
    return {
      backgroundColor: color,
      padding: '1rem 1.5rem 1.5rem',
    };
  },
  title: {
    fontFamily: 'Keania One',
    fontSize: '1rem',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'Montserrat',
    color: '#FFFFFF',
    opacity: 0.87,
    marginTop: '2rem',
    fontWeight: 500,
    fontSize: 14,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#FFFFFF',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AddCard = ({ classes, image, title, subtitle, modalFunction }) => {
  const mediaStyles = useFourThreeCardMediaStyles();
  return (
    <CardActionArea className={classes.actionArea} onClick={modalFunction}>
      <Card className={classes.card}>
        <CardMedia classes={mediaStyles} image={image} />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant={'h3'}>
            {title}
          </Typography>
          <Typography className={classes.subtitle}>{subtitle}</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

const CustomCard = ({ classes, image, title, subtitle, cost }) => {
  const mediaStyles = useFourThreeCardMediaStyles();
  return (
    <CardActionArea className={classes.actionArea}>
      <Card className={classes.card}>
        <CardMedia classes={mediaStyles} image={image} />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant={'h3'}>
            {title}
          </Typography>
          <Typography className={classes.subtitle}>{subtitle}</Typography>
          <CardActions display='flex'>
            <Typography>{cost} Points</Typography>
            <Button size="small">Claim This Reward</Button>
          </CardActions>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export const AllRewards = React.memo(function RewardCard() {

  const gridStyles = useGridStyles();
  const classes = useStyles();

  const styles = useStyles({ color: '#808080' });
  const styles2 = useStyles({ color: '#B8C1EC' });
  const styles3 = useStyles({ color: '#F6D4A0' });
  const styles4 = useStyles({ color: '#232946' });

  const [rewards, setRewards] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    console.log("AM I HERE?")
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function getRewards() {
    try {
      let response = await axios.get("/api/rewards");
      setRewards(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (rewards === null) {
      getRewards();
    }
  }, [rewards])

  return (
    <section >
      <Grid classes={gridStyles} container margin={100} spacing={4} wrap={'nowrap'}>
        <Grid item>
          <AddCard
            classes={styles}
            title={'Add a Reward'}
            subtitle={'Click to add a new reward.'}
            image={
              'https://www.jampedals.com/wp-content/uploads/2017/05/plus-sign.jpg'
            }
            onClick={handleOpen}
          />
        </Grid>
        {rewards && rewards.map(reward => {
          return (
            <Grid item key={reward.imageUrl}>
              <CustomCard
                classes={styles2}
                title={reward.name}
                subtitle={reward.description}
                cost={reward.cost}
                image={reward.imageUrl}
                onClick={handleOpen}
              />
            </Grid>
          )
        })}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Transition modal</h2>
              <p id="transition-modal-description">react-transition-group animates me.</p>
            </div>
          </Fade>
        </Modal>
      </Grid>

    </section>
  );
});
export default AllRewards
