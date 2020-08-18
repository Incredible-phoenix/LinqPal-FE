
import Layout from 'hoc/Layout';
import Landing from 'containers/Landing';
import withIfAuth from 'hoc/WithIfAuth';

const Home = () => <Layout content={<Landing />} />
export default withIfAuth(Home);