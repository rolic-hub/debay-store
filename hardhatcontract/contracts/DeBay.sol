// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract DeBay is ERC1155, Ownable, ERC1155Burnable {
    string public title;

    mapping(address => uint256) private lastMinted;

    event minted(bool sucess, address user);

    constructor()
        ERC1155(
            "https://ipfs.io/ipfs/bafybeih3z6wanp4utu7a7kgsw4xaa2zmuokyiptaqjt35pmepn2riqgptq/{id}.json"
        )
    {
        setName("DeBay NFT");
    }

    function uri(uint256 _tokenid)
        public
        pure
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    "https://ipfs.io/ipfs/bafybeih3z6wanp4utu7a7kgsw4xaa2zmuokyiptaqjt35pmepn2riqgptq/",
                    Strings.toString(_tokenid),
                    ".json"
                )
            );
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function setName(string memory _name) public onlyOwner {
        title = _name;
    }

    // transfer token then mint the nft to the users address
    function transferNmint(
        address payable to,
        uint256 id,
        uint256 nftamount,
        bytes calldata data
    ) external payable {
        uint256 amount = msg.value;
        to.transfer(amount);

        mint(id, nftamount, data);
    }

    // making sure each user mint 1 nft at a particular time after 30 minutes intervals
    function mint(
        uint256 id,
        uint256 amount,
        bytes calldata data
    ) internal {
        if (lastMinted[msg.sender] + 30 minutes < block.timestamp) {
            require(id < 4, "Id is invalid");
            require(amount == 1, "Invalid amount input");

            lastMinted[msg.sender] = block.timestamp;

            _mint(msg.sender, id, amount, data);
            emit minted(true, msg.sender);
        } else {
            emit minted(false, msg.sender);
        }
    }

    function safeTransferFrom(
        address,
        address,
        uint256,
        uint256,
        bytes calldata
    ) public pure override {
        revert("DeBay: Cannot transfer Nfts");
    }

    function safeBatchTransferFrom(
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes calldata
    ) public pure override {
        revert("DeBay: Cannot transfer Nfts");
    }
}
