import { useRouter } from 'next/router';
import { Button } from "@mui/material";
import styles from "./../templateStyles/Navbar.module.css"
import { ArrowDownToLine } from 'lucide-react';

export default function EndUserNavbar({ username, resumeURL }) {
    const router = useRouter();

    return (
        <div className={styles.navbar}>
            <div
                className="text-2xl font-semibold cursor-pointer"
                onClick={() => window.location.reload()}
            >
                {username ? username : ""}
            </div>

            <div className="flex justify-center align-middle gap-5 font-semibold text-xl">
                {
                    resumeURL && (
                        <Button
                            variant="contained"
                            size="medium"
                            startIcon={<ArrowDownToLine />}
                            sx={{ textTransform: 'none', fontSize: '20px', letterSpacing: '1px' }}
                            onClick={() => window.open(resumeURL, "_blank")}
                        >
                            Resume
                        </Button>
                    )
                }
            </div>
        </div>
    );
}