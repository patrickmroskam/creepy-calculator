import React from "react";
import { render } from "react-dom";
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
} from "@shopify/polaris";
import "@shopify/polaris/styles.css";

class Playground extends React.Component {
  state = {
    age: 40,
    gender: "male",
    q1: "",
    show: true
  };

  /*

0.Enter your age (num field) 1/2 age plus 7
0.Enter your gender (male, female, LGBTQ, undetermined)
         If male/female no change
else if LGBTQ add 2
  else if undetermined print “There may be some other things in your life that are more important than finding the lowest age you can date right now.  We suggest checking into those things and heading on back when you have figured things out a bit more.”
  */

  render() {
    const options = (
      <FormLayout>
        <ChoiceList
          title={"Did the person move out early?"}
          choices={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]}
          selected={this.state.q1}
          onChange={q1 => {
            this.setState({ q1 });
          }}
        />
        <ChoiceList
          title={"Did the person have a kid before the age of 18? "}
          choices={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]}
          selected={this.state.q1}
          onChange={q1 => {
            this.setState({ q1 });
          }}
        />
        <ChoiceList
          title={"Did the person emancipate themselves from their parents?"}
          choices={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]}
          selected={this.state.q1}
          onChange={q1 => {
            this.setState({ q1 });
          }}
        />
        <ChoiceList
          title={"Ginger me timbers?"}
          choices={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]}
          selected={this.state.q1}
          onChange={q1 => {
            this.setState({ q1 });
          }}
        />
        <ChoiceList
          title={"Are you currently alone?"}
          choices={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]}
          selected={this.state.q1}
          onChange={q1 => {
            this.setState({ q1 });
          }}
        />
        <ChoiceList
          title={"Do you have more than one cat?"}
          choices={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]}
          selected={this.state.q1}
          onChange={q1 => {
            this.setState({ q1 });
          }}
        />
        <ChoiceList
          title={"Does the carpet match the drapes?"}
          choices={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]}
          selected={this.state.q1}
          onChange={q1 => {
            this.setState({ q1 });
          }}
        />
      </FormLayout>
    );

    return (
      <AppProvider>
        <Page singleColumn title="Creepy Calculator">
          <Layout>
            <Layout.Section>
              <Banner title="Your lowest datable age is 19!" status="success" />
            </Layout.Section>
            <Layout.Section>
              <Card>
                <Card.Section>
                  <FormLayout>
                    <TextField
                      type="number"
                      label="Age"
                      value={this.state.age}
                      onChange={age => {
                        this.setState({ age });
                      }}
                    />
                    <Select
                      label="Gender"
                      options={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                        { label: "LGBTQ", value: "lgbtq" },
                        { label: "Undetermined", value: "undetermined" }
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

render(<Playground />, document.getElementById("root"));
