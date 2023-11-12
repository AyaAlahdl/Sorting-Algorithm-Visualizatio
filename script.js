const container = document.getElementById('visualization-container');
let elements = [10, 3, 8, 2, 5, 9, 1, 4, 7, 6];
let sortingAlgorithm = 'bubble';
let animationSpeed = 200;
let isSorting = false;
let animationTimeout;

function updateVisualization() {
  container.innerHTML = elements.map(element => `<div class="sorting-element" style="height: ${element * 10}px;"></div>`).join('');
}

function performSortingAlgorithm() {
  switch (sortingAlgorithm) {
    case 'bubble':
      bubbleSort();
      break;
    case 'insertion':
      insertionSort();
      break;
    case 'selection':
      selectionSort();
      break;
      case 'merge':
  mergeSort();
  break;
case 'quick':
  quickSort();
  break;
case 'heap':
  heapSort();
  break;
default:
  bubbleSort();
  }
}

async function bubbleSort() {
  let n = elements.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (elements[i] > elements[i + 1]) {
        let temp = elements[i];
        elements[i] = elements[i + 1];
        elements[i + 1] = temp;
        swapped = true;
        updateVisualization();
        await sleep(animationSpeed);
      }
    }
    n--;
  } while (swapped);
}

async function insertionSort() {
  let n = elements.length;
  for (let i = 1; i < n; i++) {
    let key = elements[i];
    let j = i - 1;
    while (j >= 0 && elements[j] > key) {
      elements[j + 1] = elements[j];
      j--;
    }
    elements[j + 1] = key;
    updateVisualization();
    await sleep(animationSpeed);
  }
}

async function selectionSort() {
  let n = elements.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (elements[j] < elements[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      let temp = elements[i];
      elements[i] = elements[minIndex];
      elements[minIndex] = temp;
      updateVisualization();
      await sleep(animationSpeed);
    }
  }
}

async function mergeSort() {
async function merge(arr, start, mid, end) {
const left = arr.slice(start, mid + 1);
const right = arr.slice(mid + 1, end + 1);

let i = 0,
  j = 0,
  k = start;

while (i < left.length && j < right.length) {
  if (left[i] <= right[j]) {
    arr[k] = left[i];
    i++;
  } else {
    arr[k] = right[j];
    j++;
  }
  k++;
  updateVisualization();
  await sleep(animationSpeed);
}

while (i < left.length) {
  arr[k] = left[i];
  i++;
  k++;
  updateVisualization();
  await sleep(animationSpeed);
}

while (j < right.length) {
  arr[k] = right[j];
  j++;
  k++;
  updateVisualization();
  await sleep(animationSpeed);
}
}

async function mergeSortRecursive(arr, start, end) {
if (start < end) {
  const mid = Math.floor((start + end) / 2);
  await mergeSortRecursive(arr, start, mid);
  await mergeSortRecursive(arr, mid + 1, end);
  await merge(arr, start, mid, end);
}
}

await mergeSortRecursive(elements, 0, elements.length - 1);
}

async function quickSort() {
async function partition(arr, low, high) {
const pivot = arr[high];
let i = low - 1;

for (let j = low; j <= high - 1; j++) {
  if (arr[j] < pivot) {
    i++;
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    updateVisualization();
    await sleep(animationSpeed);
  }
}

const temp = arr[i + 1];
arr[i + 1] = arr[high];
arr[high] = temp;
updateVisualization();
await sleep(animationSpeed);

return i + 1;
}

async function quickSortRecursive(arr, low, high) {
if (low < high) {
  const pi = await partition(arr, low, high);
  await quickSortRecursive(arr, low, pi - 1);
  await quickSortRecursive(arr, pi + 1, high);
}
}

await quickSortRecursive(elements, 0, elements.length - 1);
}

async function heapSort() {
async function heapify(arr, n, i) {
let largest = i;
const left = 2 * i + 1;
const right = 2 * i + 2;

if (left < n && arr[left] > arr[largest]) {
  largest = left;
}

if (right < n && arr[right] > arr[largest]) {
  largest = right;
}

if (largest !== i) {
  const temp = arr[i];
  arr[i] = arr[largest];
  arr[largest] = temp;
  updateVisualization();
  await sleep(animationSpeed);

  await heapify(arr, n, largest);
}
}

async function buildHeap(arr) {
const n = arr.length;
const start = Math.floor(n / 2) - 1;

for (let i = start; i >= 0; i--) {
  await heapify(arr, n, i);
}
}

async function heapSort(arr) {
const n = arr.length;

await buildHeap(arr);

for (let i = n - 1; i > 0; i--) {
  const temp = arr[0];
  arr[0] = arr[i];
  arr[i] = temp;
  updateVisualization();
  await sleep(animationSpeed);

  await heapify(arr, i, 0);
}
}

await heapSort(elements);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function changeAlgorithm() {
  sortingAlgorithm = document.getElementById('algorithm-select').value;
}

function changeSpeed() {
  animationSpeed = document.getElementById('speed-range').value;
}

function startSorting() {
  if (!isSorting) {
    isSorting = true;
    performSortingAlgorithm();
  }
}

function resetSorting() {
  clearTimeout(animationTimeout);
  elements = [10, 3, 8, 2, 5, 9, 1, 4, 7, 6];
  updateVisualization();
  isSorting = false;
}

updateVisualization();