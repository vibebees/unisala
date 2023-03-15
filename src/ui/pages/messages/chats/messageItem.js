export const MessageItem = ({ item, index, currentUserId }) => {

    return (<div key={index} className="chat-box__msg  ">
    <div
        className={` ${item.senderId === currentUserId
            ? "msg-text-sent"
            : "msg-text-received"
            }`}
    >
        <p>{item?.message?.text}</p>
    </div>
</div>)
}
