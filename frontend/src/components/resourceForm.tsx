import React, { useState } from "react";

const ResourceForm = () => {
const [resourceType, setResourceType] = useState("");
const [resourceFile, setResourceFile] = useState<File | null>(null);
const [resourceTitle, setResourceTitle] = useState("");
const [resourceDescription, setResourceDescription] = useState("");
const [resourceTags, setResourceTags] = useState<string[]>([]);



const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();
};

return (
<form onSubmit={handleSubmit}>
    <div>
        <h2>1/2</h2>
        <h4>Ajouter une nouvelle ressource</h4>
        <label>
        <input
            type="radio"
            value="lien"
            checked={resourceType === "lien"}
            onChange={() => setResourceType("lien")}
        />
        Lien
        </label>
        <label>
        <input
            type="radio"
            value="fichier"
            checked={resourceType === "fichier"}
            onChange={() => setResourceType("fichier")}
        />
        Fichier
        </label>
        <br />
        <label>
        <input type="text"/>
        </label>
        <button type="button">
        + Ajouter
        </button>
    </div>
    <div>
        <h2>2/2</h2>
        <h4>Ajouter une nouvelle ressource</h4>
        <input
        type="file"
        onChange={(e) => e.target.files && setResourceFile(e.target.files[0])}
        />
        <br/>
        <label>
        Nom de la ressource
        <input
            type="text"
            value={resourceTitle}
            onChange={(e) => setResourceTitle(e.target.value)}
        />
        </label>
        <br />
        <label>
        Description :
        <textarea
            value={resourceDescription}
            onChange={(e) => setResourceDescription(e.target.value)}
        />
        </label>
        <br />
        <label>
        Tags :
        <input
            type="text"
            value={resourceTags}
            onChange={(e) => setResourceTags(e.target.value.split(","))}
        />
        </label>
        <br />
        <button type="submit">Valider</button>
    </div>
</form>
);
};

export default ResourceForm;
