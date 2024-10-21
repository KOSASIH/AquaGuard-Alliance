// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CommunityEvents is Ownable {
    struct Event {
        uint256 id;
        string name;
        string description;
        uint256 date; // Unix timestamp
        address[] participants;
        bool isActive;
    }

    mapping(uint256 => Event) public events; // Mapping of event ID to Event struct
    uint256 public eventCount; // Total number of events

    event EventCreated(uint256 id, string name, string description, uint256 date);
    event ParticipantRegistered(uint256 eventId, address participant);

    // Function to create a new community event
    function createEvent(string memory _name, string memory _description, uint256 _date) public onlyOwner {
        require(_date > block.timestamp, "Event date must be in the future");

        eventCount++;
        events[eventCount] = Event(eventCount, _name, _description, _date, new address[](0), true);

        emit EventCreated(eventCount, _name, _description, _date);
    }

    // Function for users to register for an event
    function registerForEvent(uint256 _eventId) public {
        Event storage _event = events[_eventId];
        require(_event.isActive, "Event is not active");
        require(_event.date > block.timestamp, "Event has already occurred");

        _event.participants.push(msg.sender);
        emit ParticipantRegistered(_eventId, msg.sender);
    }

    // Function to get event details
    function getEvent(uint256 _eventId) public view returns (Event memory) {
        return events[_eventId];
    }
}
