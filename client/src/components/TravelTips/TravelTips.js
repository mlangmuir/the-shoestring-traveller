import styled from "styled-components";
import ImageSlider from "./ImageSlider";
import LoadingPage from "../LoadingPage";
import { useContext, useEffect } from "react";
import { Context } from "../../Context";
import secretFlying from "../../assets/secret-flying.png";
import skyScanner from "../../assets/skyscanner.png";
import couchSurfing from "../../assets/couchsurfing.png";
import hostelWorld from "../../assets/hostelworld.png";
import bookingCom from "../../assets/booking-com.png";
import getYourGuide from "../../assets/get-your-guide.png";

const TravelTips = () => {

    const { isLoading } = useContext(Context);

    return (
        <>
        {!isLoading
            ? <Wrapper>
                <ImageSlider />
                <SitesDiv>
                    <Title>Book your trip!</Title>
                    <Description>You have read the Shoestring Traveller's travel tips and are now ready to plan your trip. Here are some excellent websites to help you book your dream vacation!</Description>
                    <SiteDiv>
                        <a href="https://secretflying.com" target="_blank">
                            <Image src={secretFlying} alt="SecretFlying logo" />
                        </a>
                        <Text>My favourite resource for finding unbelievably low prices on flights. Choose your city and see what jaw-dropping deals are in store for you! Keep in mind that although you can find deals, you cannot directly book through this website. The best practice would be to use this platform to find the destination and dates before booking with Google Flights or Skyscanner.</Text>
                    </SiteDiv>
                    <SiteDiv>
                        <a href="https://skyscanner.com" target="_blank">
                            <Image src={skyScanner} alt="Skyscanner logo" />
                        </a>
                        <Text>Skyscanner is a great search engine for finding budget flights that some larger search engines may miss. The website always provides you the lowest fare available based on the dates and destinations you key in!</Text>
                    </SiteDiv>
                    <SiteDiv>
                        <a href="https://couchsurfing.com" target="_blank">
                            <Image src={couchSurfing} alt="Couchsurfing logo" />
                        </a>
                        <Text>This is an excellent way to get free accomodation while travelling! Basically, the platform allow you to stay on people's couches for free. Every host has a profile and references that you can review before you agree to stay at their home. If this is still not something you are comfortable with, the site also allows people to post events where you can meet locals and fellow travellers!</Text>
                    </SiteDiv>
                    <SiteDiv>
                        <a href="https://hostelworld.com" target="_blank">
                            <Image src={hostelWorld} alt="Hostelworld logo" />
                        </a>
                        <Text>This is the website that I have booked most of my accomdation with and I have never been disappointed. It has and biggest listing of hostels on the Internet and offers free cancellation for most bookings.</Text>
                    </SiteDiv>
                    <SiteDiv>
                        <a href="https://booking.com" target="_blank">
                            <Image src={bookingCom} alt="Booking.com logo" />
                        </a>
                        <Text>If you are not totally set on staying in hotels, Booking.com might be the site for you. The website includes just about every type of accomodation from hotels to B&B's. It also provides an unbelievable amount of filters for you to customize your search.</Text>
                    </SiteDiv>
                    <SiteDiv style={{border: "none"}}>
                        <a href="https://getyourguide.com" target="_blank">
                            <Image src={getYourGuide} alt="Get Your Guide logo" />
                        </a>
                        <Text>This platform provides a massive selection of tours and excursions, from cheap walking tours to extravagant overnight excursions. If you ever change your mind about a booking, you can get a full refund so long as you cancel more than 24 hours in advance.</Text>
                    </SiteDiv>
                </SitesDiv>
            </Wrapper>
            : <LoadingPage />
        }
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SitesDiv = styled.div`
    width: 60%;
    margin: 50px 0;

    @media (max-width: 750px) {
        width: 80%;
    }
`;

const Title = styled.h1`
    text-align: center;
    font-size: 42px;
`;

const Description = styled.p`
    font-size: 20px;
    border-bottom: 1px solid lightgrey;
    padding-bottom: 50px;
    margin-top: 50px;
`;

const SiteDiv = styled.div`
    padding: 25px 0;
    display: flex;
    align-items: center;
    border-bottom: 1px dotted lightgrey;

    @media (max-width: 1100px) {
        flex-direction: column;
    }
`;

const Image = styled.img`
    width: 300px;
`;

const Text = styled.p`
    margin-left: 60px;
    font-size: 20px;
    text-align: justify;

    @media (max-width: 1100px) {
        margin-left: 0;
    }
`;

export default TravelTips;