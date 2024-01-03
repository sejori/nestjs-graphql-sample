import { mockUsers } from './mock.data';

export default async () => {
  try {
    await Promise.all(
      mockUsers.map((user) => global.userService.deleteUser({ id: user.id })),
    );
  } catch (e) {
    console.log(e);
  }

  global.app.close();
};
