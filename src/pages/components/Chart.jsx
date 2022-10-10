import React, { useEffect, useRef, useState } from 'react'
// import BubbleChart from '@weknow/react-bubble-chart-d3'
import BubbleChart from '../../../charts/react-bubble-chart-d3'

const Chart = () => {
  const centerStyle = 'max-w-[1200px] flex justify-center mx-auto'

  const ref = useRef(null);

  // const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function handleWindowResize() {
      // setHeight(ref.current.offsetHeight);
      setWidth(ref.current.offsetWidth);
    }

    // immediately call function to render 
    handleWindowResize() 

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }

  }, [])

  const bubbleClick = () => {
    console.log('Custom bubble click func')
  }
  const legendClick = () => {
    console.log('Customer legend click func')
  }

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <h1 className={`${centerStyle} bg-blue-200`}>Chart</h1>
      {/* <div className={`${centerStyle} bg-blue-200`}>
        <h2>Width: {windowSize.innerWidth}</h2>
        <h2>Height: {windowSize.innerHeight}</h2>
      </div> */}
      <div className={`${centerStyle} `} ref={ref}>
          <BubbleChart
            graph={{
              zoom: 1,
              offsetX: 0,
              offsetY: 0,
            }}
            width={width * 0.8}
            height={width * 0.8}
            padding={0} // optional value, number that set the padding between bubbles
            showLegend={false} // optional value, pass false to disable the legend.
            legendPercentage={20} // number that represent the % of with that legend going to use.
            legendFont={{
              family: 'Arial',
              size: 12,
              color: '#505050',
              weight: 'bold',
            }}
            valueFont={{
              family: 'Arial',
              size: 12,
              color: '#505050',
              weight: 'bold',
            }}
            labelFont={{
              family: 'Arial',
              size: 16,
              color: '#505050',
              weight: 'bold',
            }}
            // Custom bubble/legend click functions such as searching using the label, redirecting to other page
            bubbleClickFunc={() => bubbleClick}
            legendClickFun={() => legendClick}
            data={[
              { label: 'generative', value: 18 },
              { label: 'abstract', value: 14 },
              { label: 'art', value: 14 },
              { label: 'generativeart', value: 11 },
              { label: 'nft', value: 11 },
              { label: 'ai', value: 10 },
              { label: 'aiart', value: 10 },
              { label: 'Abstract', value: 9 },
              { label: 'Art', value: 7 },
              { label: 'Colors', value: 7 },
              { label: 'Modern', value: 7 },
              { label: 'beauty', value: 7 },
              { label: 'pixel', value: 7 },
              { label: 'generativenft', value: 7 },
              { label: 'illustrative', value: 6 },
              { label: 'p5js', value: 6 },
              { label: 'pixel', value: 7 },
              { label: 'generativenft', value: 7 },
              { label: 'illustrative', value: 6 },
              { label: 'p5js', value: 6 },
              { label: 'pixel', value: 7 },
              { label: 'generativenft', value: 7 },
              { label: 'illustrative', value: 6 },
              { label: 'p5js', value: 6 },
            ]}
          />
      </div>
    </>
  )
}

export default Chart
