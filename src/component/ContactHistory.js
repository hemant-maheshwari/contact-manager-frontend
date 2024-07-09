import React from "react";

const ContactHistory = ({history}) => {

    const formatDate = (isoTimestamp) => {
        const date = new Date(isoTimestamp);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
        const formattedDate = `${month}-${day}-${year}`;
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;
        return `${formattedDate} ${formattedTime}`;
    }

    return(
        <div className="contact-history-wrapper">
            <h2>Contact History</h2>
            <div className="history">
                {history.map((h) => {
                    return (
                        <div key={h.id} className="entry">
                            <div className="action">{h.action}</div>
                            <div className="date-div">{formatDate(h.updated_at)}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

} 

export default ContactHistory;