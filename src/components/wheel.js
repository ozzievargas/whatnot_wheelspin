import * as styles from "../components/wheel.module.css"

import {
  DEFAULT_LABEL,
  DEFAULT_SPIN_DURATION,
  DEFAULT_VALUE,
} from "../utils/wheelDefaults"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { RotationContainer, getRotationDegrees } from "./rotationContainer"
import {
  formatLabel,
  generateChartLabelColor,
  getChartLabelRotation,
} from "../utils/labelUtils"

import { Doughnut } from "react-chartjs-2"
import randomColor from "randomColor"
import { useSpinDuration } from "../utils/useSpinDuration"

const NameWheel = ({
  mustStartSpinning,
  prizeNumber,
  entries,
  beautifyEnabled,
  onStopSpinning = () => null,
  spinDuration = DEFAULT_SPIN_DURATION,
}) => {
  const [labels, setLabels] = useState([])
  const [values, setValues] = useState([])
  const [backgroundColor, setBackgroundColor] = useState([])
  const [startRotationDegrees, setStartRotationDegrees] = useState(0)
  const [finalRotationDegrees, setFinalRotationDegrees] = useState(0)
  const [hasStartedSpinning, setHasStartedSpinning] = useState(false)
  const [hasStoppedSpinning, setHasStoppedSpinning] = useState(false)
  const [isCurrentlySpinning, setIsCurrentlySpinning] = useState(false)
  const {
    startSpinningTime,
    continueSpinningTime,
    stopSpinningTime,
    totalSpinningTime,
  } = useSpinDuration(spinDuration)

  const mustStopSpinning = useRef(false)

  /**
   *
   */
  useEffect(() => {
    console.log(
      "%c 🍎 beautifyEnabled: ",
      "font-size:20px;background-color: #ED9EC7;color:#fff;",
      beautifyEnabled
    )
    const totalEntries = entries.length
    let beautifyInProgress = null

    const dt = new Array(totalEntries)
    const lb = new Array(totalEntries)
    const bg = new Array(totalEntries)

    entries.forEach(({ name, color }, idx) => {
      const prevEntry = entries[idx - 1]
      let targetIdx = idx
      let targetValue = 1

      if (
        beautifyEnabled &&
        prevEntry &&
        prevEntry.name === name &&
        prevEntry.color === color
      ) {
        beautifyInProgress = !beautifyInProgress ? idx - 1 : beautifyInProgress

        targetIdx = beautifyInProgress
        targetValue = dt[targetIdx] + 1
      } else {
        beautifyInProgress = null
      }

      dt[targetIdx] = targetValue
      lb[targetIdx] = name
      bg[targetIdx] = color
    })

    setValues(dt.filter(t => !!t))
    setLabels(lb.filter(b => !!b))
    setBackgroundColor(bg.filter(g => !!g))
  }, [entries, beautifyEnabled])

  /**
   *
   */
  useEffect(() => {
    if (mustStartSpinning && !isCurrentlySpinning) {
      setIsCurrentlySpinning(true)
      startSpinning()
      const finalRotationDegreesCalculated = getRotationDegrees(
        prizeNumber,
        entries.length
      )
      setFinalRotationDegrees(finalRotationDegreesCalculated)
    }
  }, [mustStartSpinning])

  /**
   *
   */
  useEffect(() => {
    if (hasStoppedSpinning) {
      setIsCurrentlySpinning(false)
      setStartRotationDegrees(finalRotationDegrees)
    }
  }, [hasStoppedSpinning])

  /**
   *
   */
  const startSpinning = () => {
    setHasStartedSpinning(true)
    setHasStoppedSpinning(false)
    mustStopSpinning.current = true
    setTimeout(() => {
      if (mustStopSpinning.current) {
        mustStopSpinning.current = false
        setHasStartedSpinning(false)
        setHasStoppedSpinning(true)
        onStopSpinning()
      }
    }, totalSpinningTime)
  }

  /**
   *
   */
  const generateBorderWidth = useCallback(() => {
    if (entries.length >= 800) return 0
    else {
      return Math.floor()
    }
  }, [entries])

  /**
   *
   */
  const getWheelStyles = useCallback(() => {
    if (hasStartedSpinning) {
      return {
        animation: `spin ${
          startSpinningTime / 1000
        }s cubic-bezier(0.71, -0.29, 0.96, 0.9) 0s 1 normal forwards running, continueSpin ${
          continueSpinningTime / 1000
        }s linear ${
          startSpinningTime / 1000
        }s 1 normal forwards running, stopSpin ${
          stopSpinningTime / 1000
        }s cubic-bezier(0, 0, 0.35, 1.02) ${
          (startSpinningTime + continueSpinningTime) / 1000
        }s 1 normal forwards running`,
      }
    }

    return {}
  }, [hasStartedSpinning])

  return (
    <RotationContainer
      id="wheel-rotator"
      className={styles.wheel}
      style={getWheelStyles()}
      startSpinningTime={startSpinningTime}
      continueSpinningTime={continueSpinningTime}
      stopSpinningTime={stopSpinningTime}
      startRotationDegrees={startRotationDegrees}
      finalRotationDegrees={finalRotationDegrees}
    >
      <Doughnut
        id="spin-wheel"
        options={{
          responsive: true,
          maintainAspectRatio: false,
          borderColor: "#000000",
          borderWidth: generateBorderWidth(),
          cutout: "30%",
          plugins: {
            tooltip: {
              enabled: entries.length > 100 ? true : false,
            },
            legend: {
              display: false,
            },
            datalabels: {
              align: "start",
              anchor: "center", //start, center, end
              color: generateChartLabelColor,
              rotation: getChartLabelRotation,
              formatter: formatLabel,
            },
          },
        }}
        data={{
          labels: labels?.length > 0 ? labels : DEFAULT_LABEL,
          datasets: [
            {
              data: values.length > 0 ? values : DEFAULT_VALUE,
              backgroundColor:
                backgroundColor.length > 0 ? backgroundColor : randomColor(),
            },
          ],
        }}
      />
    </RotationContainer>
  )
}

export default NameWheel
