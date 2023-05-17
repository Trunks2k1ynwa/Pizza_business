import { Avatar } from "../atoms/Avatar";

const UserProfile = () => {
  return (
    <div className="flex-center w-fit rounded-full gap-x-3 px-4 py-2 cursor-pointer border border-primary">
      <Avatar />
      <span>Trunks</span>
    </div>
  );
};

export default UserProfile;
