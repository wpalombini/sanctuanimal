import { Avatar, Box, CreateIcon, Link } from '@sanctuanimal/ui';
import { useRouter } from 'next/router';
import { CldImage, CldUploadWidget } from 'next-cloudinary';

import { trpc } from '@/lib/http/client/trpc';
import { useNotificationStore } from '@/lib/stores';
import { NotificationError, NotificationSuccess } from '@/lib/types';

type ResidentDetailsProfileImageEditorProps = { profileImageVersion?: number; residentId?: string };

export const ResidentDetailsProfileImageEditor = ({
  residentId,
  profileImageVersion,
}: ResidentDetailsProfileImageEditorProps) => {
  const params = useRouter();
  const sanctuaryId = params.query.slug as string;
  const utils = trpc.useContext();
  const { setNotification } = useNotificationStore();

  const { isLoading: updateResidentIsMutating, mutate: updateProfileImage } =
    trpc.updateResidentProfileImage.useMutation({
      onSuccess(data, variables) {
        utils.getResidentById.invalidate({ id: variables.id, sanctuaryId: variables.sanctuaryId });
        // utils.getResidents.invalidate();
        setNotification(NotificationSuccess);
      },
      onError(error) {
        console.error(`onError updateResidentProfileImage resident.id: ${residentId}`, error);
        setNotification(NotificationError);
      },
    });

  return (
    <CldUploadWidget
      options={{
        cropping: true,
        croppingAspectRatio: 1,
        croppingCoordinatesMode: 'custom',
        multiple: false,
        publicId: `${residentId}`,
        sources: ['local'],
        showSkipCropButton: false,
        showPoweredBy: false,
        tags: ['profile', `${process.env.NEXT_PUBLIC_ENVIRONMENT}`],
      }}
      signatureEndpoint="/api/cloudinary/sign" // https://cloudinary.com/blog/guest_post/signed-uploads-in-cloudinary-with-next-js
      uploadPreset="profile-preset"
    >
      {({ open, results, error, isLoading }) => {
        if (results?.event === 'success') {
          const info = results.info as { version: number };
          if (
            !isNaN(info.version) &&
            !updateResidentIsMutating &&
            info.version !== profileImageVersion
          ) {
            updateProfileImage({
              id: residentId as string,
              profileImageVersion: info.version,
              sanctuaryId,
            });
          }
        }

        if (error) {
          console.error('error', error);
        }

        return (
          <Link
            component="button"
            onClick={e => {
              e.preventDefault();
              open();
            }}
          >
            <Box
              sx={{
                position: 'relative',
                height: { xs: 50, md: 200 },
                width: { xs: 50, md: 200 },
              }}
            >
              <Avatar sx={{ height: '100%', width: '100%' }}>
                {!!profileImageVersion && !!residentId && !isLoading ? (
                  <CldImage
                    alt="Resident profile image edit"
                    src={`sanctuanimal/profile/${residentId}`}
                    version={profileImageVersion}
                    fill
                  />
                ) : null}
              </Avatar>

              <Avatar
                sx={{
                  bgcolor: 'white',
                  border: 2,
                  borderColor: 'primary.main',
                  bottom: { xs: 1, md: 10 },
                  color: 'primary.main',
                  position: 'absolute',
                  left: { xs: 35, md: 150 },
                  height: { xs: '30%', md: '20%' },
                  width: { xs: '30%', md: '20%' },
                }}
              >
                <CreateIcon sx={{ width: '100%', height: '100%', padding: { xs: 0, md: 0.5 } }} />
              </Avatar>
            </Box>
          </Link>
        );
      }}
    </CldUploadWidget>
  );
};
