import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createMessage , getMessages } from "../../../services/MessageService";

const MessageCreated = () => {
    const { id } = useParams();

    const [data, setMessage] = useState({
		receiver: id,
        msg: "",
	})
   
    const handleOnChange = (event) => {
        const { name , value } = event.target
        setMessage({
          ...data,
          [name]: value
        })
	};

    const onSubmit = (event) => {
		event.preventDefault();
		
        createMessage(data).then((response) => {
            console.log(response);
        });
	
	};
   
    return (
        <div>
            <div>
                Map lista de menssajes
            </div>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        className="form-control"
                        value={data.msg}
                        onChange={handleOnChange}
                        name="msg"
                        type="text"
                        id="msg"
                        placeholder="Your Message"
                    />
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
        )
}

export default MessageCreated


