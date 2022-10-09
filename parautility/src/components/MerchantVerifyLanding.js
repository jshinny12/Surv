import { useNavigate } from "react-router";

const MerchantVerifyLanding = () => {
    const navigate = useNavigate();

    return(
        <div>
            <p>Successful Login</p>
            <p>Would you like to:</p>
            <form>
                <input type={"button"} value={"Set Up Your Company?"} id={"setup"} onClick={ (e) => navigate("/company-setup") } />
                <input type={"button"} value={"Join An Existing Company?"} id={"join"} onClick={ (e) => navigate("/company-join") } />
            </form>
        </div>
    )
}

export default MerchantVerifyLanding