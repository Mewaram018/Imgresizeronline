import React, { useEffect } from "react";

const AdComponent = () => {
    useEffect(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, []);

    return (
        <div>
            <ins className="adsbygoogle"
                 style={{ display: "block" }}
                 data-ad-client="ca-pub-8749680655578506"
                 data-ad-slot="1469647300"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
        </div>
    );
};

export default AdComponent;
