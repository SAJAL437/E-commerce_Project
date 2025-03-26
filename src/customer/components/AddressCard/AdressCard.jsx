const AdressCard = ({ address }) => {
  return (
    <div>
      <div className="space-y-2 ">
        <p className="font-bold">{`${address?.firstName} ${address?.lastName}`}</p>
        <p>{`${address?.streetAddress} ${address?.city} ${address?.state} ${address?.zipCode}`}</p>
        <div className="space-y-1">
          <p className="font-bold">Phone Number</p>
          <p>{address?.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default AdressCard;
