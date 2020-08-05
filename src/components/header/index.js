import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router/match';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// import Tooltip from "@material-ui/core/Tooltip";

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Divider from '@material-ui/core/Divider';

import * as Scroll from "react-scroll";
const ScrollLink = Scroll.Link;

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
  },
  list: {
    padding: 0,
    display: 'flex',
    // flexGrow: 1,
  },
  listItem: {

  },
  menuButton: {
    marginLeft: 'auto',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <nav className={classes.root}>
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            preact
          </Typography>
          <List className={classes.list}>
            <ListItem className={classes.listItem}>
              <ScrollLink className={classes.scrollLink + " " + classes.navLink} to="about" spy={true} smooth="easeOutQuint" duration={500} color="transparent">About</ScrollLink>
            </ListItem>
            <ListItem className={classes.listItem}>
              <ScrollLink className={classes.scrollLink + " " + classes.navLink} to="media" spy={true} smooth="easeOutQuint" duration={500} color="transparent">Media</ScrollLink>
            </ListItem>
            <ListItem className={classes.listItem}>
              <ScrollLink className={classes.scrollLink + " " + classes.navLink} to="profiles" spy={true} smooth="easeOutQuint" duration={500} color="transparent">
                Profiles
              </ScrollLink>
            </ListItem>
            <ListItem className={classes.listItem}>
              <ScrollLink className={classes.scrollLink + " " + classes.navLink} to="shows" spy={true} smooth="easeOutQuint" duration={500} color="transparent">
                Shows
              </ScrollLink>
            </ListItem>
          </List>
          <div>
            {['right'].map((anchor) => (
              <Fragment key={anchor}>
                <IconButton edge="start" className={classes.menuButton}
                  onClick={toggleDrawer(anchor, true)}
                  color="inherit" aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                  {list(anchor)}
                </Drawer>
              </Fragment>
            ))}
          </div>


        </Toolbar>
      </AppBar>
    </nav>
  );
}
