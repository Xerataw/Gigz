import Layout from '../Layout/Layout';
import ChatList from '../../components/Chat/ChatList';

const Conversations: React.FC = () => {
  return (
    <Layout navBarShadow={false}>
      <ChatList />
    </Layout>
  );
};

export default Conversations;
