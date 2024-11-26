<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marketplace</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="sidebar">
        <button id="openMarketBtn">Open Marketplace</button>
    </div>

    <div id="marketplace" class="marketplace">
        <!-- Top Navigation Buttons -->
        <div class="market-nav">
            <button id="forYouBtn">For You</button>
            <button id="sellBtn">Sell</button>
            <button id="categoriesBtn">Categories</button>
        </div>

        <!-- Main Content Section -->
        <div id="marketContent" class="market-content">
            <!-- Dynamic Content will load here -->
        </div>

        <!-- Close Button -->
        <button id="closeMarketBtn" class="close-btn">Close Marketplace</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
