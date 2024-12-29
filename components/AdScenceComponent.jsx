"use client"

import { useEffect } from "react";

const AdScenceComponent = () => {

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (error) {
                console.error('AdSense error:', err);
            }
        }
    }, [])
    return (
        <div>
            <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-9035732498574241"
                data-ad-slot="1656184874"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    );
}

export default AdScenceComponent;