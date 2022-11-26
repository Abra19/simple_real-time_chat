import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';

const Messages = () => {
  const { t } = useTranslation();
  const { messages } = useSelector((state) => state.messages);
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const currentChannelName = channels.length !== 0
    ? channels.find((el) => el.id === currentChannelId).name : '';
  const currentChannelMessagesLength = messages
    .filter((el) => el.channelId === currentChannelId).length;

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannelName}`}</b>
          </p>
          <span className="text-muted">
            {t('messagesCounter.messages', { count: currentChannelMessagesLength })}
          </span>
        </div>
      </div>
    </Col>
  );
};

// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path></svg>
export default Messages;
