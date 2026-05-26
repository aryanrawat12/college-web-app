"use client";

import {
  departments,
  isDepartment,
  programmesByDepartment,
  type Department,
} from "@/lib/departments";
import { formLabelClass, formSelectClass } from "@/lib/form-styles";

type DepartmentProgrammeFieldsProps = {
  department: string;
  programme: string;
  onDepartmentChange: (value: string) => void;
  onProgrammeChange: (value: string) => void;
  departmentLabel?: string;
  programmeLabel?: string;
};

export default function DepartmentProgrammeFields({
  department,
  programme,
  onDepartmentChange,
  onProgrammeChange,
  departmentLabel = "Department",
  programmeLabel = "Programme",
}: DepartmentProgrammeFieldsProps) {
  const programmes = isDepartment(department)
    ? programmesByDepartment[department as Department]
    : [];

  return (
    <>
      <div>
        <label htmlFor="department" className={formLabelClass}>
          {departmentLabel}
        </label>
        <select
          id="department"
          name="department"
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className={formSelectClass}
        >
          <option value="">Select department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="programme" className={formLabelClass}>
          {programmeLabel}
        </label>
        <select
          id="programme"
          name="programme"
          value={programme}
          onChange={(e) => onProgrammeChange(e.target.value)}
          disabled={!department}
          className={`${formSelectClass} disabled:cursor-not-allowed disabled:opacity-60`}
        >
          <option value="">
            {department ? "Select programme" : "Select department first"}
          </option>
          {programmes.map((prog) => (
            <option key={prog} value={prog}>
              {prog}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
