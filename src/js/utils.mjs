// utils.mjs

// Function to load HTML content dynamically into a specified element
export function loadHTML(url, elementId) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => {
      console.error("Error loading HTML file:", error);
    });
}

// Function to fetch a template and return the response text
export async function loadTemplate(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Error loading template from ${url}: ${response.statusText}`
      );
    }
    return await response.text();
  } catch (error) {
    console.error("Error loading template:", error);
  }
}

// Function to render a list of items with a template
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn); // Map list to HTML using template function

  // Clear parent element if required
  if (clear) {
    parentElement.innerHTML = "";
  }

  // Insert the generated HTML at the specified position
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Function to render a single item with a template
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template); // Insert the template

  // If there is a callback, execute it with the provided data
  if (callback) {
    callback(data);
  }
}

// Function to render the header and footer dynamically
export async function loadHeaderFooter() {
  // Load the header template from the partials directory
  const headerTemplate = await loadTemplate("/header.html");
  const headerElement = document.querySelector("#header");

  // Load the footer template from the partials directory
  const footerTemplate = await loadTemplate("/footer.html");
  const footerElement = document.querySelector("#footer");

  // Render the header and footer into their respective elements
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

// Retrieve data from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
