/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const userFilter9090 = { 'addedBy': { '$in': user } };
      const user6539 = await deleteUser(userFilter9090);
      const userFilter3213 = { 'updatedBy': { '$in': user } };
      const user2914 = await deleteUser(userFilter3213);
      const userTokensFilter2926 = { 'userId': { '$in': user } };
      const userTokens8870 = await deleteUserTokens(userTokensFilter2926);
      const userTokensFilter3849 = { 'addedBy': { '$in': user } };
      const userTokens8300 = await deleteUserTokens(userTokensFilter3849);
      const userTokensFilter7505 = { 'updatedBy': { '$in': user } };
      const userTokens2731 = await deleteUserTokens(userTokensFilter7505);
      const roleFilter3686 = { 'addedBy': { '$in': user } };
      const role1544 = await deleteRole(roleFilter3686);
      const roleFilter9855 = { 'updatedBy': { '$in': user } };
      const role4889 = await deleteRole(roleFilter9855);
      const projectRouteFilter0399 = { 'addedBy': { '$in': user } };
      const projectRoute0614 = await deleteProjectRoute(projectRouteFilter0399);
      const projectRouteFilter3476 = { 'updatedBy': { '$in': user } };
      const projectRoute7194 = await deleteProjectRoute(projectRouteFilter3476);
      const routeRoleFilter2078 = { 'addedBy': { '$in': user } };
      const routeRole2823 = await deleteRouteRole(routeRoleFilter2078);
      const routeRoleFilter8740 = { 'updatedBy': { '$in': user } };
      const routeRole6883 = await deleteRouteRole(routeRoleFilter8740);
      const userRoleFilter5991 = { 'userId': { '$in': user } };
      const userRole7985 = await deleteUserRole(userRoleFilter5991);
      const userRoleFilter1490 = { 'addedBy': { '$in': user } };
      const userRole4205 = await deleteUserRole(userRoleFilter1490);
      const userRoleFilter3018 = { 'updatedBy': { '$in': user } };
      const userRole6061 = await deleteUserRole(userRoleFilter3018);
      return await User.deleteMany(filter);
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    return await UserTokens.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter3501 = { 'roleId': { '$in': role } };
      const routeRole9095 = await deleteRouteRole(routeRoleFilter3501);
      const userRoleFilter2264 = { 'roleId': { '$in': role } };
      const userRole3768 = await deleteUserRole(userRoleFilter2264);
      return await Role.deleteMany(filter);
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter4141 = { 'routeId': { '$in': projectroute } };
      const routeRole6277 = await deleteRouteRole(routeRoleFilter4141);
      return await ProjectRoute.deleteMany(filter);
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
        
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);

      const userFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userCnt =  await dbService.countDocument(User,userFilter);

      const userTokensFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userTokensCnt =  await dbService.countDocument(UserTokens,userTokensFilter);

      const roleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const roleCnt =  await dbService.countDocument(Role,roleFilter);

      const projectRouteFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const projectRouteCnt =  await dbService.countDocument(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
        
    const userTokensCnt =  await UserTokens.countDocuments(filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
        
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
        
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    routeId : { '$in' : projectroute } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
        
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
        
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const userFilter3064 = { 'addedBy': { '$in': user } };
      const user4203 = await softDeleteUser(userFilter3064, updateBody);
      const userFilter7191 = { 'updatedBy': { '$in': user } };
      const user9926 = await softDeleteUser(userFilter7191, updateBody);
      const userTokensFilter4424 = { 'userId': { '$in': user } };
      const userTokens8807 = await softDeleteUserTokens(userTokensFilter4424, updateBody);
      const userTokensFilter8666 = { 'addedBy': { '$in': user } };
      const userTokens4929 = await softDeleteUserTokens(userTokensFilter8666, updateBody);
      const userTokensFilter6228 = { 'updatedBy': { '$in': user } };
      const userTokens7637 = await softDeleteUserTokens(userTokensFilter6228, updateBody);
      const roleFilter6938 = { 'addedBy': { '$in': user } };
      const role7953 = await softDeleteRole(roleFilter6938, updateBody);
      const roleFilter2665 = { 'updatedBy': { '$in': user } };
      const role4960 = await softDeleteRole(roleFilter2665, updateBody);
      const projectRouteFilter3453 = { 'addedBy': { '$in': user } };
      const projectRoute9014 = await softDeleteProjectRoute(projectRouteFilter3453, updateBody);
      const projectRouteFilter2816 = { 'updatedBy': { '$in': user } };
      const projectRoute0595 = await softDeleteProjectRoute(projectRouteFilter2816, updateBody);
      const routeRoleFilter5523 = { 'addedBy': { '$in': user } };
      const routeRole8624 = await softDeleteRouteRole(routeRoleFilter5523, updateBody);
      const routeRoleFilter9835 = { 'updatedBy': { '$in': user } };
      const routeRole3842 = await softDeleteRouteRole(routeRoleFilter9835, updateBody);
      const userRoleFilter4705 = { 'userId': { '$in': user } };
      const userRole2575 = await softDeleteUserRole(userRoleFilter4705, updateBody);
      const userRoleFilter2174 = { 'addedBy': { '$in': user } };
      const userRole0074 = await softDeleteUserRole(userRoleFilter2174, updateBody);
      const userRoleFilter1527 = { 'updatedBy': { '$in': user } };
      const userRole1874 = await softDeleteUserRole(userRoleFilter1527, updateBody);
      return await User.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserTokens.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter2881 = { 'roleId': { '$in': role } };
      const routeRole5107 = await softDeleteRouteRole(routeRoleFilter2881, updateBody);
      const userRoleFilter9820 = { 'roleId': { '$in': role } };
      const userRole5447 = await softDeleteUserRole(userRoleFilter9820, updateBody);
      return await Role.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter4161 = { 'routeId': { '$in': projectroute } };
      const routeRole9986 = await softDeleteRouteRole(routeRoleFilter4161, updateBody);
      return await ProjectRoute.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await RouteRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
