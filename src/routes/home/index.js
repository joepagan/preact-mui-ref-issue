import { h } from 'preact';
import style from './style';
import Button from '@material-ui/core/Button';

const Home = () => (
	<div class={style.home}>
		<h1>Home</h1>
		<p>This is the Home component.</p>
    <Button variant="contained" color="primary">
      Hello World
    </Button>
	</div>
);

export default Home;
