import { Relation } from '../sequelize/';

export const getPartnerId = id => (
  Relation.findOne({
    where: {
      $or: [
        { user1: id },
        { user2: id },
      ],
    },
  }).then(relation => {
    if (relation) {
      return relation.user1 === id ? relation.user2 : relation.user1;
    }
    return null;
  })
);
