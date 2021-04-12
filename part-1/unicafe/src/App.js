import React, { useState } from 'react'


const Button = ({title, handleClick}) =>
  <button onClick={handleClick}>{title}</button>

const SectionHeader = ({content}) => <h1>{content}</h1>

const CounterButton = ({counterConfig}) => {
  const clickHandler = () => counterConfig.setter(counterConfig.counter + 1)

  return <Button title={counterConfig.label} handleClick={clickHandler} />
}

const StatisticLine  = ({label, value, separator}) => (
    <tr>
      <td>{label}{separator}</td>
      <td>{value}</td>
    </tr>
  )

const CounterLine = ({counterConfig, separator}) =>
  <StatisticLine
      label={counterConfig.label}
      value={counterConfig.counter}
      separator={separator} />

const FeedbackSection = ({config}) => {
  return (
    <>
      <SectionHeader content={config.labels.sectionTitleFeedback} />

      <CounterButton counterConfig={config.ratingGood} />
      <CounterButton counterConfig={config.ratingNeutral} />
      <CounterButton counterConfig={config.ratingBad} />
    </>
  )
}

const StatisticsSection = ({config}) => {
  const lbls = config.labels
  const title = <SectionHeader content={lbls.sectionTitleStatistics} />
  const kvSep = lbls.keyValueSeparator

  const totFeedbackCount =
        config.ratingGood.counter +
        config.ratingNeutral.counter +
        config.ratingBad.counter
  const average = totFeedbackCount === 0 ? 0 :
        (config.ratingGood.counter - config.ratingBad.counter) / totFeedbackCount
  const percentageOfPositives = totFeedbackCount === 0 ? 0 :
        100 * (config.ratingGood.counter / totFeedbackCount)

  if (totFeedbackCount < 1) {
    return <> {title} <div>{lbls.noFeedbackNotification}</div> </>
  }

  return (
    <>
      {title}

      <table>
        <tbody>
          <CounterLine counterConfig={config.ratingGood} separator={kvSep} />
          <CounterLine counterConfig={config.ratingNeutral} separator={kvSep} />
          <CounterLine counterConfig={config.ratingBad} separator={kvSep} />
          <StatisticLine label={lbls.numOfFeedbacks} separator={kvSep} value={totFeedbackCount} />
          <StatisticLine label={lbls.avgOfFeedbacks} separator={kvSep} value={average} />
          <StatisticLine label={lbls.positiveFeedbacks} separator={kvSep} value={percentageOfPositives + " %"} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [counterGood, setterGood] = useState(0)
  const [counterNeutral, setterNeutral] = useState(0)
  const [counterBad, setterBad] = useState(0)

  const feedbackConfig = {
    labels: {
      keyValueSeparator: ": ",
      sectionTitleFeedback: "Give Feedback",
      sectionTitleStatistics: "Statistics",
      numOfFeedbacks: "Number of feedbacks",
      avgOfFeedbacks: "Average of feedbacks",
      positiveFeedbacks: "Positive feedbacks",
      noFeedbackNotification: "No feedback given",
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
  }

  return (
    <>
      <FeedbackSection config={feedbackConfig} />
      <StatisticsSection config={feedbackConfig} />
    </>
  )
}

export default App
