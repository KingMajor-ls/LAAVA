import { useState } from 'react';
import '../../Styles/Market.css';

const Market = () => {
  const [selectedTab, setSelectedTab] = useState('forYou');

  const renderContent = () => {
    switch (selectedTab) {
      case 'forYou':
        return <div>Top picks for you based on your interests</div>;
      case 'sell':
        return (
          <div className="sell-form">
            <input type="file" accept="image/*" />
            <input type="text" placeholder="Enter item description" />
            <input type="number" placeholder="Enter your rating (1-5)" />
            <button>Submit</button>
          </div>
        );
      case 'categories':
        return (
          <div className="categories">
            <button>Buy and Sell Groups</button>
            <button>Saved Items</button>
            <div className="top-categories">
              <h3>Top Categories</h3>
              <ul>
                <li>Vegetables</li>
                <li>Fruits</li>
                <li>Electronics</li>
                {/* Add more categories */}
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="market">
      <div className="marketplace-tabs">
        <button onClick={() => setSelectedTab('forYou')}>For You</button>
        <button onClick={() => setSelectedTab('sell')}>Sell</button>
        <button onClick={() => setSelectedTab('categories')}>Categories</button>
      </div>
      <div className="market-content">{renderContent()}</div>
    </div>
  );
};

export default Market;
