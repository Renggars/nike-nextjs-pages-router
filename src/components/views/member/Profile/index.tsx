import MemberLayout from "@/components/layouts/MemberLayout";
import ButtonManual from "@/components/ui/ButtonManual/index";
import Input from "@/components/ui/Input";
import { ToasterContext } from "@/contexts/ToasterContext";
import { uploadFile } from "@/lib/firebase/service";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import Image from "next/image";
import React, { FormEvent, useContext, useEffect, useState } from "react";

const ProfilMemberView = () => {
  const { setToaster } = useContext(ToasterContext);
  const [changeImage, setChangeImage] = useState<File | any>({});
  const [isLoading, setIsLoading] = useState("");

  const [profile, setProfile] = useState<User | any>({});

  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleChangeProfilePicture = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("picture");
    const form = e.target as HTMLFormElement;
    const file = form.image.files[0];
    const newName = "profile." + file.name.split(".")[1];

    if (file) {
      uploadFile(
        profile.id,
        file,
        newName,
        "users",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            const result = await userServices.updateProfile(data);
            if (result.status === 200) {
              setIsLoading("");
              setProfile({
                ...profile,
                image: newImageURL,
              });
              setChangeImage({});
              form.reset();
              setToaster({
                variant: "success",
                message: "Success Change Avatar",
              });
            } else {
              setIsLoading("");
              setToaster({
                variant: "danger",
                message: "Failed Change Profile",
              });
            }
          } else {
            setIsLoading("");
            setChangeImage({});
            setToaster({
              variant: "danger",
              message: "Failed Change Profile",
            });
          }
        }
      );
    }
  };

  const handleChangeProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("profile");
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };
    const result = await userServices.updateProfile(data);
    if (result.status === 200) {
      setIsLoading("");
      setProfile({
        ...profile,
        fullname: data.fullname,
        phone: data.phone,
      });
      form.reset();
      setToaster({
        variant: "success",
        message: "success update profile",
      });
    } else {
      setIsLoading("");
    }
  };

  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("password");
    const form = e.target as HTMLFormElement;
    const data = {
      password: form["new-password"].value,
      oldPassword: form["old-password"].value,
      encryptedPassword: profile.password,
    };
    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading("");
        form.reset();
        setToaster({
          variant: "success",
          message: "Success Update Password",
        });
      }
    } catch (error) {
      setIsLoading("");
      setToaster({
        variant: "danger",
        message: "Failed update Password",
      });
    }
  };

  return (
    <MemberLayout>
      <div className="text-2xl font-semibold">Profile</div>
      <div className="flex gap-5 mt-10 mr-3">
        <div className="w-[25%] shadow-lg border border-gray-100 shadow-gray-200 rounded-xl flex flex-col justify-center items-center p-5">
          <div className="text-xl font-semibold mb-3">Avatar</div>
          {profile.image ? (
            <Image
              src={profile.image}
              alt="profile"
              width={200}
              height={200}
              className="rounded-full aspect-square w-[150px] h-[150px object-cover object-center"
            />
          ) : (
            <div className=" w-[80%] aspect-square bg-gray-100 rounded-full flex items-center justify-center text-[64px] font-bold">
              {profile?.fullname?.charAt(0)}
            </div>
          )}
          <form onSubmit={handleChangeProfilePicture} className="w-full">
            <label
              htmlFor="upload-image"
              className="mt-8 bg-gray-100 flex flex-col justify-center items-center gap-3 p-3 cursor-pointer rounded-lg"
            >
              {changeImage.name ? (
                <p>{changeImage.name}</p>
              ) : (
                <>
                  <p className="text-center text-sm">
                    Upload new avatar, Larger image will be resized
                    automatically
                  </p>
                  <p className="text-center text-sm ">
                    Maximum upload size is <b>1 MB</b>
                  </p>
                </>
              )}
            </label>
            <input
              type="file"
              name="image"
              id="upload-image"
              onChange={(e: any) => {
                e.preventDefault();
                setChangeImage(e.currentTarget.files[0]);
              }}
              className="opacity-0 absolute -z-10"
            />
            <ButtonManual type="submit" classname="mt-3">
              {isLoading === "picture" ? "Uploading..." : "Upload"}
            </ButtonManual>
          </form>
        </div>

        <div className="w-[50%] shadow-lg border border-gray-100 shadow-gray-200 p-5 rounded-xl">
          <div className="text-xl font-semibold mb-2">Profile</div>
          <form onSubmit={handleChangeProfile}>
            <Input
              label="Fullname"
              type="text"
              name="fullname"
              defaultValue={profile.fullname}
            />
            <Input
              label="Phone"
              type="number"
              name="phone"
              defaultValue={profile.phone}
              placeholder="Enter your phone number"
            />
            <Input
              label="Email"
              type="email"
              name="email"
              defaultValue={profile.email}
              disabled
            />
            <Input
              label="Role"
              type="text"
              name="role"
              defaultValue={profile.role}
              disabled
            />
            <ButtonManual type="submit" classname="mt-5">
              {isLoading === "profile" ? "loading..." : "Update Profile"}
            </ButtonManual>
          </form>
        </div>

        <div className="w-[25%] shadow-lg border border-gray-100 shadow-gray-200 p-5 rounded-xl">
          <div className="text-xl font-semibold mb-2">Change Password</div>
          <form onSubmit={handleChangePassword}>
            <Input
              name="old-password"
              label="Old Password"
              type="password"
              placeholder="Enter your old password"
              disabled={profile.type === "google"}
            />
            <Input
              name="new-password"
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              disabled={profile.type === "google"}
            />
            <ButtonManual
              type="submit"
              classname="mt-5 disabled:opacity-70 disabled:hover:bg-blue-600"
              disabled={isLoading === "password" || profile.type === "google"}
            >
              {isLoading === "password" ? "loading..." : "Update Password"}
            </ButtonManual>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfilMemberView;
