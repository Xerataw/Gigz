import Layout from '../Layout/Layout';
import ConversationList from '../../components/Chat/ConversationList';

const Conversations: React.FC = () => {
  return (
    <Layout navBarShadow={false}>
      <ConversationList />
    </Layout>
  );
};

export default Conversations;
