const { Member, BookTransacation } = require("../models");

const createMember = async (req, res) => {
  try {
    const { firstName, lastName, email, address, phone } = req.body;

    const existingMember = await Member.findOne({
      where: { email: email },
    });

    if (existingMember) {
      return res.status(409).json({
        message: "This email is already registered!",
      });
    }

    const membershipNumber = `LIB-${Date.now()}`;

    const member = await Member.create({
      membershipNumber,
      firstName,
      lastName,
      email,
      address,
      phone,
    });

    return res.status(201).json({
      message: "Member created successfully!",
      member: member,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const getAllMembers = async (req, res) => {
  try {
    const members = await Member.findAll();

    return res.status(200).json({
      message: "Members fetched successfully!",
      totalMembers: members.length,
      members: members,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const getSingleMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Member.findOne({
      where: { id: id },
    });

    if (!member) {
      return res.status(404).json({
        message: "Member not found!",
      });
    }

    return res.status(200).json({
      message: "Member fetched successfully!",
      member: member,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const updateMember = async (req, res) => {
  try {
    const { id } = req.params;

    const { firstName, lastName, email, address, phone, status } = req.body;

    const member = await Member.findOne({
      where: { id: id },
    });

    if (!member) {
      return res.status(404).json({
        message: "Member not found!",
      });
    }

    if (email !== undefined) {
      const existingMember = await Member.findOne({
        where: { email: email },
      });

      if (existingMember && existingMember.id !== member.id) {
        return res.status(409).json({
          message: "This email is already registered!",
        });
      }
    }

    await member.update({
      firstName: firstName === undefined ? member.firstName : firstName,
      lastName: lastName === undefined ? member.lastName : lastName,
      email: email === undefined ? member.email : email,
      address: address === undefined ? member.address : address,
      phone: phone === undefined ? member.phone : phone,
      status: status === undefined ? member.status : status,
    });

    return res.status(200).json({
      message: "Member updated successfully!",
      member: member,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Member.findOne({
      where: { id: id },
    });

    if (!member) {
      return res.status(404).json({
        message: "Member not found!",
      });
    }

    const transaction = await BookTransacation.findOne({
      where: { MemberId: id },
    });

    if (transaction) {
      return res.status(409).json({
        message: "Member has book transactions and cannot be deleted!",
      });
    }

    await member.destroy();

    return res.status(200).json({
      message: "Member deleted successfully!",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  createMember,
  getAllMembers,
  getSingleMember,
  updateMember,
  deleteMember,
};
