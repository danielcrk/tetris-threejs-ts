/**
 * An array containing the default tetrad shapes and their colors.
 */
const tetrads = [

    {
      matrix: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      color: '#d9afdd',
    },

    {
      matrix: [
        [1, 1],
        [1, 1],
      ],
      color: '#d9e6b1',
    },

    {
      matrix: [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
      color: '#fff481',
    },

    {
      matrix: [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      color: '#fff481',
    },

    {
      matrix: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      color: '#f08482',
    },

    {
      matrix: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      color: '#a6bfe7',
    },

    {
      matrix: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      color: '#a6bfe7',
  },

];

/**
 * Returns a random tetrad.
 */
const generateRandomTetradShape = (): any => {
  return tetrads[Math.floor(Math.random() * tetrads.length)];
};

export default generateRandomTetradShape;
