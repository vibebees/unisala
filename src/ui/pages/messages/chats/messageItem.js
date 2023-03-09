export const MessageItem = ({ item, index }) => {

    console.log({ item })
    return (<div key={index} className="chat-box__msg  ">
    <div
        className={` ${item.senderId === "63fd5eebff23d1aa31eba285"
            ? "msg-text-sent"
            : "msg-text-received"
            }`}
    >
        <p>{item?.message?.text}</p>
    </div>
</div>)
}
