import web3 from './web3Utils';

// Function to create a contract instance
export const getContractInstance = (contractABI, contractAddress) => {
    return new web3.eth.Contract(contractABI, contractAddress);
};

// Function to get all catches from the FishermenWelfare contract
export const getAllCatches = async (fishermenWelfareContract) => {
    const catchCount = await fishermenWelfareContract.methods.catchCount().call();
    const catches = [];
    for (let i = 1; i <= catchCount; i++) {
        const catchDetails = await fishermenWelfareContract.methods.getCatch(i).call();
        catches.push(catchDetails);
    }
    return catches;
};

// Function to list a new catch
export const listNewCatch = async (fishermenWelfareContract, species, quantity, price, from) => {
    try {
        await fishermenWelfareContract.methods.listCatch(species, quantity, price).send({ from });
        return true;
    } catch (error) {
        console.error("Error listing new catch:", error);
        return false;
    }
};

// Function to buy a catch
export const buyCatch = async (fishermenWelfareContract, catchId, quantity, from) => {
    try {
        await fishermenWelfareContract.methods.buyCatch(catchId, quantity).send({ from });
        return true;
    } catch (error) {
        console.error("Error buying catch:", error);
        return false;
    }
};

// Function to issue rewards to a user
export const issueReward = async (userRewardsContract, user, amount, from) => {
    try {
        await userRewardsContract.methods.issueReward(user, amount).send({ from });
        return true;
    } catch (error) {
        console.error("Error issuing reward:", error);
        return false ;
    }
};

// Function to get the user's reward balance
export const getUserRewardBalance = async (userRewardsContract, user) => {
    try {
        const balance = await userRewardsContract.methods.getUserRewardBalance(user).call();
        return balance;
    } catch (error) {
        console.error("Error fetching user reward balance:", error);
        return 0;
    }
};

// Function to create a new community event
export const createCommunityEvent = async (communityEventsContract, title, description, from) => {
    try {
        await communityEventsContract.methods.createEvent(title, description).send({ from });
        return true;
    } catch (error) {
        console.error("Error creating community event:", error);
        return false;
    }
};

// Function to get all community events
export const getAllCommunityEvents = async (communityEventsContract) => {
    const eventCount = await communityEventsContract.methods.eventCount().call();
    const events = [];
    for (let i = 1; i <= eventCount; i++) {
        const eventDetails = await communityEventsContract.methods.getEvent(i).call();
        events.push(eventDetails);
    }
    return events;
};
