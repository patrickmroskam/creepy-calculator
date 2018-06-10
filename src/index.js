import React from 'react';
import { render } from 'react-dom';
import {
  AppProvider,
  Page,
  Card,
  FormLayout,
  TextField,
  Select,
  ChoiceList,
  Banner,
  Layout,
  Sticky,
  TextContainer,
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';

const BannerStates = Object.freeze({
  SUCCESS: 'success',
  WARNING: 'warning',
  CRITICAL: 'critical',
});

const Gender = Object.freeze({
  MALE: 'male',
  FEMALE: 'female',
  LGBTQ: 'lgbtq',
  UNDETERMINED: 'undetermined',
});

class Playground extends React.Component {
  state = {
    age: 40,
    gender: 'male',
    moveOutEarly: '',
    kidBeforeEighteen: '',
    emancipateFromParents: '',
    ginger: '',
    currentlyAlone: '',
    moreThanOneCat: '',
    carpetMatchDrapes: '',
    show: true,
    container: null,
  };

  get dateableAge() {
    let age = (this.state.age / 2) + 7;

    if (this.state.gender === Gender.LGBTQ) {
      age += 2;
    }

    if (this.state.moveOutEarly[0] === true) {
      if (this.state.gender === Gender.MALE) {
        age--;
      } else if (this.state.gender === Gender.FEMALE) {
        age++;
      } else if (this.state.gender === Gender.LGBTQ) {
        age += 2;
      }
    } else if (this.state.moveOutEarly[0] === false && this.state.gender === Gender.LGBTQ) {
      age -= 2;
    }

    if (this.state.kidBeforeEighteen[0] === true) {
      if (this.state.gender === Gender.MALE) {
        age -= 2;
      } else if (this.state.gender === Gender.FEMALE) {
        age += 5;
      } else if (this.state.gender === Gender.LGBTQ) {
        age += 7;
      }
    }

    if (this.state.emancipateFromParents[0] === true && (this.state.gender === Gender.MALE || this.state.gender === Gender.FEMALE)) {
      age -= 2;
    } else if (this.state.emancipateFromParents[0] === false) {
      age += 2;
    }

    if (this.state.ginger[0] === true) {
      age += 10;
    } else if (this.state.ginger[0] === false) {
      age--;
    }

    if (this.state.currentlyAlone[0] === true) {
      if (this.state.gender === Gender.MALE) {
        age--;
      } else if (this.state.gender === Gender.FEMALE) {
        age += 4;
      } else if (this.state.gender === Gender.LGBTQ) {
        age -= 2;
      }
    } else if (this.state.currentlyAlone[0] === false) {
      if (this.state.gender === Gender.MALE) {
        age++;
      } else if (this.state.gender === Gender.FEMALE) {
        age += 2;
      } else if (this.state.gender === Gender.LGBTQ) {
        age--;
      }
    }

    if (this.state.moreThanOneCat[0] === true) {
      age += 20;
    }

    if (this.state.carpetMatchDrapes[0] === true) {
      if (this.state.gender === Gender.MALE) {
        age--;
      } else if (this.state.gender === Gender.FEMALE) {
        age += 25;
      } else if (this.state.gender === Gender.LGBTQ) {
        age -= 2;
      }
    } else if (this.state.carpetMatchDrapes[0] === false) {
      if (this.state.gender === Gender.MALE) {
        age += 5;
      } else if (this.state.gender === Gender.FEMALE) {
        age += 3;
      }
    }

    return Math.floor(age);
  }

  get bannerText() {
    let text = `Your lowest dateable age is ${this.dateableAge} without being creepy`;

    if (this.state.gender === Gender.UNDETERMINED) {
      text = 'There may be some other things in your life that are more important than finding the lowest age you can date right now. We suggest checking into those things and heading on back when you have figured things out a bit more.';
    } else if (this.dateableAge < 18) {
      text = 'Your lowest dateable age involves prison time. Stop taking dating advice from Dazed and Confused.';
    }
    else if (this.dateableAge > (this.state.age * 2)) {
      text = `Your lowest dateable age is ${this.dateableAge} without being creepy.  But, you are a GOLD DIGGER.`;
    }

    return text;
  }

  get bannerState() {
    let status;

    if (this.dateableAge < 18 || this.state.gender === Gender.UNDETERMINED) {
      status = BannerStates.CRITICAL;
    } else {
      status = BannerStates.SUCCESS;
    }

    return status;
  }

  get funnyQuip() {
    let quip = null;

    if (this.state.gender === Gender.UNDETERMINED) {
      return quip;
    }

    if (this.state.moveOutEarly[0] === true) {
      if (this.state.gender === Gender.MALE) {
        quip = 'Good for you. She‘s growing up early so you don‘t have to.';
      }
    }

    if (this.state.ginger[0] === true) {
      quip = 'Gingers have no soul.';
    }

    if (this.state.currentlyAlone[0] === true) {
      if (this.state.gender === Gender.MALE) {
        quip = 'You need the options.';
      } else if (this.state.gender === Gender.FEMALE) {
        quip = 'Older is more your style.';
      } else if (this.state.gender === Gender.LGBTQ) {
        quip = 'RuPaul would be so proud!';
      }
    } else if (this.state.currentlyAlone[0] === false) {
      if (this.state.gender === Gender.MALE) {
        quip = 'Why are you looking at this with someone there?';
      } else if (this.state.gender === Gender.FEMALE) {
        quip = 'Don’t you have a kitchen to clean?';
      } else if (this.state.gender === Gender.LGBTQ) {
        quip = 'Why were we not invited to this party?';
      }
    }

    if (this.state.moreThanOneCat[0] === true) {
      quip = 'No one needs a cat.';
    } else if (this.state.moreThanOneCat[0] === false) {
      quip = 'Good. No one needs a cat.';
    }

    if (this.state.carpetMatchDrapes[0] === true) {
      if (this.state.gender === Gender.FEMALE) {
        quip = 'Why is there carpet?';
      } else if (this.state.gender === Gender.LGBTQ) {
        quip = 'That‘s just for today right?';
      }
    } else if (this.state.carpetMatchDrapes[0] === false) {
      if (this.state.gender === Gender.MALE) {
        quip = 'Are you sure you selected the right gender?';
      }
    }

    return quip;
  }

  componentDidMount() {

  }

  render() {
    const funnyQuipBanner = (
      <Sticky>
        <Banner title={this.funnyQuip} />
      </Sticky>
    );

    const options = (
      <FormLayout>
        <ChoiceList
          title="Did the person move out early?"
          choices={[
            { label: 'Yes', value: true },
            { label: 'No', value: false }
          ]}
          selected={this.state.moveOutEarly}
          onChange={moveOutEarly => {
            this.setState({ moveOutEarly });
          }}
        />
        <ChoiceList
          title="Did the person have a kid before the age of 18? "
          choices={[
            { label: 'Yes', value: true },
            { label: 'No', value: false }
          ]}
          selected={this.state.kidBeforeEighteen}
          onChange={kidBeforeEighteen => {
            this.setState({ kidBeforeEighteen });
          }}
        />
        <ChoiceList
          title="Did the person emancipate themselves from their parents?"
          choices={[
            { label: 'Yes', value: true },
            { label: 'No', value: false }
          ]}
          selected={this.state.emancipateFromParents}
          onChange={emancipateFromParents => {
            this.setState({ emancipateFromParents });
          }}
        />
        <ChoiceList
          title="Ginger me timbers?"
          choices={[
            { label: 'Yes', value: true },
            { label: 'No', value: false }
          ]}
          selected={this.state.ginger}
          onChange={ginger => {
            this.setState({ ginger });
          }}
        />
        <ChoiceList
          title="Are you currently alone?"
          choices={[
            { label: 'Yes', value: true },
            { label: 'No', value: false }
          ]}
          selected={this.state.currentlyAlone}
          onChange={currentlyAlone => {
            this.setState({ currentlyAlone });
          }}
        />
        <ChoiceList
          title="Do you have more than one cat?"
          choices={[
            { label: 'Yes', value: true },
            { label: 'No', value: false }
          ]}
          selected={this.state.moreThanOneCat}
          onChange={moreThanOneCat => {
            this.setState({ moreThanOneCat });
          }}
        />
        <ChoiceList
          title="Does the carpet match the drapes?"
          choices={[
            { label: 'Yes', value: true },
            { label: 'No', value: false }
          ]}
          selected={this.state.carpetMatchDrapes}
          onChange={carpetMatchDrapes => {
            this.setState({ carpetMatchDrapes });
          }}
        />
      </FormLayout>
    );

    return (
      <AppProvider>
        <Page singleColumn title="Creepy Calculator">
          <Layout>
            <Layout.Section>
              <div style={{zIndex: 50, position: 'relative'}}>
                <TextContainer>
                  <Sticky>
                    <Banner title={this.bannerText} status={this.bannerState} />
                  </Sticky>

                  {this.funnyQuip !== null ? funnyQuipBanner : null}
                </TextContainer>
              </div>
            </Layout.Section>
            <Layout.Section>
              <Card>
                <Card.Section>
                  We all know the standard.  Did you know that it can be adjusted based on outside factors?  Like did you know that you can date a year younger than the standard if she has more than one kid?  Fill out the following questionnaire to find out your Lowest Datable Age.
                </Card.Section>
                <Card.Section>
                  <FormLayout>
                    <TextField
                      type="number"
                      label="Enter your age"
                      value={this.state.age}
                      onChange={age => {
                        this.setState({ age });
                      }}
                    />
                    <Select
                      label="Select your gender"
                      options={[
                        { label: 'Male', value: Gender.MALE },
                        { label: 'Female', value: Gender.FEMALE },
                        { label: 'LGBTQ', value: Gender.LGBTQ },
                        { label: 'Undetermined', value: Gender.UNDETERMINED }
                      ]}
                      value={this.state.gender}
                      onChange={gender => {
                        this.setState({ gender });
                      }}
                    />
                  </FormLayout>
                </Card.Section>
                <Card.Section>{this.state.show ? options : null}</Card.Section>
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </AppProvider>
    );
  }
}

render(<Playground />, document.getElementById('root'));
