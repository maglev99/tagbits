// Determines color of tags based on random starting color 
// then cycling through color palette changing colors every
// time the count changes so tags with same count are the same color

const tagBackgroundPalettes = [
  'bg-[#465B90]',
  'bg-[#b06868]',
  'bg-[#7DA863]',
  'bg-[#67518A]',
  'bg-[#894A83]',
  'bg-[#B69059]',
  'bg-[#A06BA1]',
]

const getRandomInt = (max: number) => Math.floor(Math.random() * max)

let currentBgColorIndex = getRandomInt(7)

// keeps track of current count for each tag to switch colors when next tag has a different count than previous 
let currentCount = 0 

const chooseTagColor = (count: number) => {
  if (count && currentCount !== count)
  {
    currentCount = count
    currentBgColorIndex = 0 + ((currentBgColorIndex + 1) % 7)
  }

  return tagBackgroundPalettes[currentBgColorIndex]
}

export default chooseTagColor