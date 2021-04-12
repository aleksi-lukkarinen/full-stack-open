import React, { useState } from 'react'


const Button = ({title, handleClick}) =>
  <button onClick={handleClick}>{title}</button>

const SectionHeader = ({content}) => <h1>{content}</h1>

const CounterButton = ({counterConfig}) => {
  const clickHandler = () => counterConfig.setter(counterConfig.counter + 1)

  return <Button title={counterConfig.label} handleClick={clickHandler} />
}

const CounterLabel = ({counterConfig, separator}) => {
  return (<div>
      <span>{counterConfig.label}</span>
      <span>{separator}</span>
      <span>{counterConfig.counter}</span>
    </div>)
}

const FeedbackSection = ({config}) => {
  return (
    <>
      <SectionHeader content={config.sectionTitles.feedback} />

      <CounterButton counterConfig={config.ratingGood} />
      <CounterButton counterConfig={config.ratingNeutral} />
      <CounterButton counterConfig={config.ratingBad} />
    </>
  )
}

const StatisticsSection = ({config}) => {
  return (
    <>
      <SectionHeader content={config.sectionTitles.statistics} />
      <CounterLabel counterConfig={config.ratingGood} separator={config.counterSeparator} />
      <CounterLabel counterConfig={config.ratingNeutral} separator={config.counterSeparator} />
      <CounterLabel counterConfig={config.ratingBad} separator={config.counterSeparator} />
    </>
  )
}

const App = () => {
  const [counterGood, setterGood] = useState(0)
  const [counterNeutral, setterNeutral] = useState(0)
  const [counterBad, setterBad] = useState(0)

  const feedbackConfig = {
    sectionTitles: {
      feedback: "Give Feedback",
      statistics: "Statistics"
    },
    ratingGood: {
      counter: counterGood,
      setter: setterGood,
      label: "Good"
    },
    ratingNeutral: {
      counter: counterNeutral,
      setter: setterNeutral,
      label: "Neutral"
    },
    ratingBad: {
      counter: counterBad,
      setter: setterBad,
      label: "Bad"
    },
    counterSeparator: ": ",
  }

  return (
    <>
      <FeedbackSection config={feedbackConfig} />
      <StatisticsSection config={feedbackConfig} />
    </>
  )
}

export default App
