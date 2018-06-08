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
  Layout
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
    funnyQuip: null,
  };

  get dateableAge() {
    let age = (this.state.age / 2) + 7;

    if (this.state.gender === Gender.LGBTQ) {
      age += 2;
    }

    if (this.state.moveOutEarly[0] === true) {
      if (this.state.gender === Gender.MALE) {
        age--;
        alert('shit');
      } else if (this.state.gender === Gender.FEMALE) {
        age++;
      } else if (this.state.gender === Gender.LGBTQ) {
        age += 2;
      }
    } else if (this.state.moveOutEarly[0] === false && this.state.gender === Gender.LGBTQ) {
      age -= 2;
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

  /*

Question flow

1. Did the person have a kid before the age of 18? 
    if yes && male
      subtract 2
    else if yes && female
      add 5
    else if LGBTQ 
      add 7
1. Did the person emancipate themselves from their parents?
    if yes && male || female 
      subtract 2
    else
      add 2
1. Ginger me timbers?
    if yes
      add 10 & print “cause Gingers have no soul”
    else
      subtract 1
1. Are you currently alone?
    if yes && male
      subtract 1 & print “you need the options”
    else if yes && female
      add 4 & print “older is more your style”
    else if yes && LGBTQ
      subtract 2 & print “Ru-Paul would be so         proud!”
    else if no && male
      add 1 & print “why are you looking at this with       someone there?”
    else if no && female 
      add 2 & print “Don’t you have a kitchen to        clean?”
    else if no && LGBTQ 
      subtract 1 & print “Why were  we not invited to       this party?” 
1. Do you have more than one cat?
    if yes 
      add 20 & print “No one needs a cat.”
    else  
      print “Good.  No one needs a cat.”
1. Does the carpet match the drapes?
    if yes && male
      subtract 1 & print “What are you doing with       your life?”
    if yes && female
      add 25 & print “Why is there carpet?
    if yes && LGBTQ
      subtract 2 & print “That’s just for today right?”
    if no && male
      add 5 and print “Are you sure you selected the      right gender?”
    if no && female
      add 3

  */

  render() {
    const funnyQuipBanner = (
      <Banner title={this.state.funnyQuip} />
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
              <Banner title={this.bannerText} status={this.bannerState} />
              {this.state.funnyQuip !== null ? funnyQuipBanner : null}
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
