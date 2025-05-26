import { UserDTO } from '../dao/DTO/UserDTO.js';

export const getCurrentUser = (req, res) => {
  const dto = new UserDTO(req.user);
  res.json({ status: 'success', user: dto });
};
