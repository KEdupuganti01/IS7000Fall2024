import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWalletDetails } from '../features/walletSlice';
import WalletDetails from './WalletDetails';
import EditWallet from './EditWallet';
import GiftCardList from './GiftCardList';
import GiftCardDetails from './GiftCardDetails';

function Wallet() {
  const dispatch = useDispatch();
  const { wallet, loading, error } = useSelector(state => state.wallet);
  const [isEditing, setIsEditing] = React.useState(false);
  const [showGiftCards, setShowGiftCards] = React.useState(false);
  const [viewingGiftCardId, setViewingGiftCardId] = React.useState(null);
  const [isAddingGiftCard, setIsAddingGiftCard] = React.useState(false);

  useEffect(() => {
    dispatch(fetchWalletDetails());
  }, [dispatch]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setIsAddingGiftCard(false);
    dispatch(fetchWalletDetails()); // Refresh wallet details after saving
  };

  const handleGiftCardClick = () => {
    setShowGiftCards(true);
  };

  const handleAddGiftCardClick = () => {
    setIsAddingGiftCard(true);
    setIsEditing(true);
  };

  const handleViewGiftCard = (id) => {
    setViewingGiftCardId(id);
  };

  const handleBack = () => {
    setViewingGiftCardId(null);
  };

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-black">Wallet</h1>

      {isEditing ? (
        <EditWallet onSave={handleSaveClick} isAddingGiftCard={isAddingGiftCard} walletData={wallet} />
      ) : (
        <WalletDetails walletData={wallet} />
      )}

      <div className="mt-4">
        <button onClick={handleEditClick} className="bg-blue-500 text-white px-4 py-2 rounded">
          Edit Wallet Info
        </button>
        <button onClick={handleGiftCardClick} className="bg-green-500 text-white px-4 py-2 rounded ml-4">
          List Gift Cards
        </button>
        <button onClick={handleAddGiftCardClick} className="bg-yellow-500 text-white px-4 py-2 rounded ml-4">
          Add Gift Card
        </button>
      </div>

      {showGiftCards && !viewingGiftCardId && (
        <GiftCardList onViewGiftCard={handleViewGiftCard} />
      )}

      {viewingGiftCardId && (
        <GiftCardDetails giftCardId={viewingGiftCardId} onBack={handleBack} />
      )}
    </div>
  );
}

export default Wallet;
