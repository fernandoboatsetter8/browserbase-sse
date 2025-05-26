const express = require('express');
const { Builder } = require('selenium-webdriver');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Basic GET endpoint to check the server is live
app.get('/', (req, res) => {
  res.send('🚀 Browserbase MCP Agent is up and running!');
});

// POST endpoint to run a simple browser task
app.post('/api/run-task', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Missing "url" in request body' 
});
  }

  try {
    // Create a Selenium driver connected to Browserbase
    const driver = await new Builder()
      .usingServer('http://connect.browserbase.com/webdriver')
      .forBrowser('chrome')
      .build();

    // Navigate to the URL
    await driver.get(url);

    // Get the page title
    const title = await driver.getTitle();

    // Close the browser
    await driver.quit();

    // Send back the title as result
    res.json({ message: 'Navigation successful!', pageTitle: title });
  } catch (error) {
    console.error('Error running browser task:', error);
    res.status(500).json({ error: 'Failed to run browser task' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});

