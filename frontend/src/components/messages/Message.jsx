const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://cdn0.iconfinder.com/data/icons/avatars-3/512/avatar_hipster_guy-512.png"
            alt="avatar"
          />
        </div>
      </div>
          <div className={"chat-bubble text-white bg-lime-600"}>Hi! Whats is up?</div>
          <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">12:42</div>
    </div>
  );
};

export default Message;