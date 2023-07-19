import * as React from "react";
import { Link } from "@yext/pages/components";
/**
 *
 * @param props
 * @returns html element of phone component.
 */

type mobile = {
  phone: string | undefined;
};

const Phone = (props: mobile) => {
  const { phone } = props;
  const prefix = phone?.substring(0, 3); /* Extract the prefix */
  const restNumber = phone?.substring(3); /* Extract the rest of the number */
  return phone ? (
    <div className="icon-row">
      <div className="icon phoneIcon"></div>
      <Link
        className="phone-number onhighLight"
        data-ya-track="phone"
        eventName="phone"
        href={`tel:${phone}`}
        rel="noopener noreferrer"
      >
        {prefix} {restNumber}
      </Link>
    </div>
  ) : (
    <></>
  );
};
export default Phone;
