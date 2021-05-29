import React from 'react';
import VideoPLayer from './player';
import UserReviews from './usersreview'
import 'bootstrap/dist/css/bootstrap.css';
import {Card, Accordion, Jumbotron, Container, Media} from 'react-bootstrap';


// 843d3ce3b56549228e7630ca03ae2589f288b917
// http://localhost:8000/
async function getShow(userToken, backendURL,showID){
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `token ${userToken}`);
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
    "showID": showID
    });
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
    let response = await fetch(`${backendURL}api/v2/shows/info`, requestOptions);
    let resObj = await response.json();
    return resObj;
}


class VideoPage extends React.Component{
    constructor(props){
        super(props);
        this.state={data:"",
                    videoURL:"",
                    userReviews:"",
                    myreview:"",
                    showID:"",
                    show:""}
        getShow(props.userToken, props.backendURL, props.showID).then(
            show => {
                    console.log(show)
                this.setState({data:JSON.stringify(show), videoURL:show.Show.videoURL, userReviews:show.Show.userReviews,
                            myreview:show.MyReview, showID:show.Show.id, show:show.Show
                })
            }
        ).catch(errMess => console.log(errMess));


    }

    render(){
        return(
            <div style={{backgroundColor:"#111"}}>
                <VideoPLayer videoURL={this.state.videoURL} videoSUB={"/subtitle.vtt"} />
              
            {
                this.state.show &&
              
                <Accordion defaultActiveKey="0" className="container">
                    <Card>
                        <Card.Body>
                            <Jumbotron fluid>
                                <Container>
                                        <h1 className="mx-3 my">Title: {this.state.show.name}</h1>
                                    <Media  className="bg-white p-2 m-3 rounded">
                                {
                                    this.state.show.posterURL &&
                                    <img className="mr-3"
                                    style={{ width: '18rem', alignSelf:"right"}}
                                    src={this.state.show.posterURL}
                                    alt="Show poster"
                                    />
                                }
                                <Media.Body>
                                <h4>{this.state.show.description}</h4>
                                <h5>Language: {this.state.show.language},   Country: {this.state.show.country}, Production Date: {this.state.show.productionDate}</h5>
                                <h5>Rate: {this.state.show.rate},   RatedPG: {this.state.show.parentGuide=="a"?"Adults +18":"Childern +13"}</h5>
                                        </Media.Body>
                                    </Media>
                                
                              
                                </Container>
                            </Jumbotron>
                        </Card.Body>
                    </Card>


                        {this.state.show.genres && 
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                Genres
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                            <div>
                                                <h4>Genres:</h4>                                         
                                                    {this.state.show.genres.map((genre, index)=><h5 key={index}>{genre.name}</h5>)}
                                            </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                                    }
                        {this.state.show.actors && 
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="2">
                                Actors
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                            <div>
                                                <h4>Actors:</h4>                                         
                                                    {this.state.show.actors.map((actor, index)=><h5 key={index}>{actor.name}</h5>)}
                                            </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                                    }

                        {this.state.show.authors && 
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="3">
                                Authors
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="3">
                                <Card.Body>
                                            <div>
                                                <h4>Authors:</h4>                                         
                                                    {this.state.show.authors.map((author, index)=><h5 key={index}>{author.name}</h5>)}
                                            </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                                    }

                    {this.state.show.producers && 

                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="4">
                                Producers
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="4">
                                <Card.Body>
                                            <div>
                                                <h4>Producers:</h4>                                         
                                                    {this.state.show.producers.map((producer, index)=><h5 key={index}>{producer.name}</h5>)}
                                            </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                                    }

                    {this.state.show.prizes && 

                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="5">
                                prizes
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="5">
                                <Card.Body>
                                            <div>
                                                <h4>Prizes:</h4>                                         
                                                    {this.state.show.prizes.map((prize, index)=><h5 key={index}>{prize.name}</h5>)}
                                            </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                                    }


                
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="6">
                        Reviews
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="6">
                        <Card.Body>
                             <UserReviews reviews={this.state.userReviews} myreview={this.state.myreview} 
                            backend={{userToken:this.props.userToken, backendURL: this.props.backendURL, showID: this.props.showID}}/>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            }
               
            </div>

        );

    } 
}


export default VideoPage;