import * as React from "react";
import { Link } from "react-router-dom";

export default function Root() {
  return (
    <div className="px-4 py-4">
      <p className="font-semibold">
        See how Search UI works:
      </p>
      <ul className="list-disc list-inside text-blue-600 mb-4">
        <li>
          <Link to="/elasticsearch">Elasticsearch</Link>
        </li>
      </ul>
    </div>
  );
}
